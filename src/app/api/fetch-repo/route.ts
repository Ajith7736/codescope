import prisma from "@/lib/server/db/db";
import { AI_EXCLUSION_MEGA_REGEX } from "@/lib/server/utils/regex";
import { GithubTree } from "@/types/type";
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

        const BATCH_SIZE = 15;
        let RepoContent: string = `Repo Name : ${repo}`

        for (let i = 0; i < ValidFiles.length; i += BATCH_SIZE) {
           
            const batchedfiles = ValidFiles.splice(i, i + BATCH_SIZE);

            const contents = await Promise.all(
                batchedfiles.map(async (batch) => {
                    try {
                        const res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${batch.path}`, {
                            headers: {
                                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                                "User-Agent": "Codescope-App"
                            }
                        })

                        if (!res.ok) {
                            return null;
                        }

                        const filecontent = await res.text();

                        return `\n------Path : ${batch.path}-----\n\n-----FileName : ${batch.path.split("/")[batch.path.split("/").length - 1]}----\n\n${filecontent}\n\n`;
                    } catch (err) {
                        console.error("Something went wrong")
                        return null;
                    }
                })
            )

            const validcontents = await contents.filter(Boolean);
            RepoContent = validcontents.join("");
        }


        const langres = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                "User-Agent": "Codescope-App"
            }
        })

        const languages = await langres.json();
        const mostused: string = Object.keys(languages).reduce((a, b) => languages[a] > languages[b] ? a : b);


        const project = await prisma.project.create({
            data : {
                projectname : repo,
                ownername : owner,
                projectcode : RepoContent,
                mostused,
                totalfiles : tree.length,
                userId : userId
            }
        })

        return NextResponse.json({ message: "success" , project }, { status: 200 })
        // return NextResponse.json({ message: "success", RepoContent, mostused }, { status: res.status })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}