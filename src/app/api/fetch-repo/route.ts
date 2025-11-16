import prisma from "@/lib/server/db/db";
import { AI_EXCLUSION_MEGA_REGEX } from "@/lib/server/utils/regex";
import { GithubRepoItem, GithubTree } from "@/types/type";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    try {
        const MAX_FILESIZE = 500 * 1024;
        const MAX_TOTALSIZE = 20 * 1024 * 1024;
        const { owner, repo, userId }: { owner: string, repo: string, userId: string } = await req.json();


        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
                "User-Agent": "Codescope-App"
            }
        })

        if (!res.ok) {
            return NextResponse.json({ message: "Repo not found" }, { status: 404 })
        }

        const resdata = await res.json();
        const branch = await resdata.default_branch;

        const treeres = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`)
        const data = await treeres.json();
        const tree: GithubTree[] = await data.tree;

        let RepoContentArray: string[] = [`Repo Name : ${repo}`]

        let totalsize = 0;

        const ValidFiles = tree.filter((item) => {

            if (item.type !== "blob") {
                return false;
            }

            if (AI_EXCLUSION_MEGA_REGEX.test(item.path)) {
                return false;
            }

            if (item.size > MAX_FILESIZE) {
                return false;
            }

            totalsize += item.size || 0;
            return true;
        })

        if (totalsize > MAX_TOTALSIZE) {
            return NextResponse.json({ message: 'Repository too large to process' }, { status: 413 })
        }


        ValidFiles.forEach(async (item) => {
            if (item.type === "blob") {
                const res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${item.path}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                        "User-Agent": "Codescope-App"
                    }
                })
                if (!res.ok) {
                    const err = await res.text();
                    console.log("file fetch failed : ", err);
                    return;
                }

                const filecontent = await res.text();
                RepoContentArray.push(`\n------Path : ${item.path}-----\n\n-----FileName : ${item.path.split("/")[item.path.split("/").length - 1]}----\n\n${filecontent}\n\n`)
            }
        })


        const RepoContent = await RepoContentArray.join("");


        console.log(`Files : ${tree.length} , ValidFiles Files : ${ValidFiles.length}`)

        const langres = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                "User-Agent": "Codescope-App"
            }
        })

        const languages = await langres.json();
        const mostused = Object.keys(languages).reduce((a, b) => languages[a] > languages[b] ? a : b);


        // await prisma.project.create({
        //     data : {
        //         projectname : repo,
        //         ownername : owner,
        //         projectcode : RepoContent,
        //         userId : userId
        //     }
        // })

        return NextResponse.json({ message: "success" , RepoContent , mostused , Totalfile : tree.length}, { status: 200 })
        // return NextResponse.json({ message: "success", RepoContent, mostused }, { status: res.status })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}