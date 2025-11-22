import prisma from "@/lib/server/db/db";
import github from "@/lib/server/github-fetch/github";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const { owner, repo, projectId }: { owner: string, repo: string, projectId: string } = await req.json();
        const res = await github(owner, repo);

        if (!res.success) {

            const { message, status } = res;
            return NextResponse.json({ message }, { status })

        } else {
            const { RepoContent, message, mostused, status, lastcommit, tree } = res;

            const project = await prisma.project.update({
                where: {
                    id: projectId,
                    projectname: repo
                },
                data: {
                    mostused,
                    projectcode: RepoContent,
                    totalfiles: tree.length,
                    lastcommit
                }
            })

            return NextResponse.json({ message, project }, { status })
        }
    } catch (err) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}   