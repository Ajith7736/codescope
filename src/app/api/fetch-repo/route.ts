import prisma from "@/lib/server/db/db";
import { GithubRepoItem } from "@/types/type";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    try {
        const { owner, repo, userId }: { owner: string, repo: string, userId: string } = await req.json();
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, {
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
                "User-Agent": "Codescope-App"
            }
        })

        if (!res.ok) {
            return NextResponse.json({ message: "Failed to fetch repo" }, { status: res.status })
        }

        const repodata: GithubRepoItem[] = await res.json();

        let filecount: number = 0;
        const RepoContentArray: string[] = [];
        const fileStructureArray: string[] = [`|-${repo}`];

        const getrepofiles = async (repodata: GithubRepoItem[] | GithubRepoItem, prefix = " ") => {
            const items = Array.isArray(repodata) ? repodata : [repodata]
            const tasks = items.map(async (item) => {
                if (item.type === "file" && item.download_url) {
                    const res = await fetch(item.download_url);
                    const filedata = await res.text();
                    RepoContentArray.push(`
                        \n----${item.path}----\n\n-----${item.name}---\n\n${filedata}
                        `)
                    fileStructureArray.push(`${prefix}|-${item.name}`)
                    filecount++;
                } else if (item.type === "dir") {
                    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${item.path}`, {
                        headers: {
                            Authorization: `token ${process.env.GITHUB_TOKEN}`,
                            "User-Agent": "Codescope-App"
                        }
                    })

                    if (!res.ok) {
                        return;
                    }

                    const folderdata = await res.json();
                    fileStructureArray.push(`${prefix}|-${item.name}/`)
                    await getrepofiles(folderdata, prefix + "  ");
                }
            })

            await Promise.all(tasks);
        }

        await getrepofiles(repodata);

        const RepoContent = RepoContentArray.join("");
        const fileStructure = fileStructureArray.join(`\n`);


        const languageres = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
                "User-Agent": "Codescope-App"
            }
        })

        const languages = await languageres.json();
        const mostused = Object.keys(languages).reduce((a, b) => languages[a] > languages[b] ? a : b);


        // await prisma.project.create({
        //     data : {
        //         projectname : repo,
        //         ownername : owner,
        //         projectcode : RepoContent,
        //         userId : userId
        //     }
        // })

        console.log(fileStructure);
        return NextResponse.json({ message: "success", RepoContent, mostused }, { status: res.status })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}