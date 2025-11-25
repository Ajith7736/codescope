import prisma from "@/lib/server/db/db";
import github from "@/lib/server/github-fetch/github";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { owner, repo, userId }: { owner: string, repo: string, userId: string } = await req.json();

        const existingproject = await prisma.project.findFirst({
            where: {
                projectname: repo,
                ownername: owner
            }
        })

        if (existingproject) {
            return NextResponse.json({ message: "Repo already added" }, { status: 409 })
        }

        const res = await github(owner, repo);

        if (!res.success) {

            const { message, status } = res;
            return NextResponse.json({ message }, { status })

        } else {
            const { RepoContent, branch, message, mostused, treestring, status, lastcommit, tree } = res;

            const project = await prisma.project.create({
                data: {
                    projectname: repo,
                    ownername: owner,
                    projectcode: RepoContent,
                    projecttree: treestring,
                    mostused,
                    lastcommit,
                    branch,
                    totalfiles: tree.length,
                    userId: userId
                }
            })

            return NextResponse.json({ message, project }, { status })

        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}