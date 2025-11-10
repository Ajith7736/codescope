import { GithubRepoItem } from "@/types/type";
import { NextResponse } from "next/server";

let filecount = 0;
let RepoContent = '';

async function getRepofiles(owner: string, repo: string, folderdata: GithubRepoItem[] | GithubRepoItem) {

    const items = Array.isArray(folderdata) ? folderdata : [folderdata];
    for (const file of items) {
        if (file.type === 'file' && file.download_url) {
            const res = await fetch(file.download_url);
            const codedata = await res.text();
            RepoContent += `\n---File Name : ${file.name}---\n\n---Path : ${file.path}---\n\n${codedata}`
            filecount++;
        } else if (file.type === 'dir') {
            const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${file.path}`, {
                headers: {
                    Authorization: `token ${process.env.GITHUB_TOKEN}`,
                    "User-Agent": "Codescope-App"
                }
            })
            if (!res.ok) {
                console.error(`failed to fetch the folder ${file.name}`)
                continue;
            }

            const data = await res.json();
            await getRepofiles(owner, repo, data);
        }
    }
}

export async function POST(req: Request) {
    try {
        const { owner, repo } = await req.json();
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, {
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
                "User-Agent": "Codescope-App"
            }
        })
        const folderdata: GithubRepoItem[] = await res.json();
        await getRepofiles(owner, repo, folderdata)
        console.log(RepoContent);
        if (res.status >= 400) {
            return NextResponse.json({ message: "Could find the repo" }, { status: res.status })
        }
        return NextResponse.json({ message: "success" , RepoContent }, { status: res.status })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}