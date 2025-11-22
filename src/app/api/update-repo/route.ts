import prisma from "@/lib/server/db/db";
import github from "@/lib/server/github-fetch/github";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const { owner, repo, projectId, lastcommit }: { owner: string, repo: string, projectId: string, lastcommit: string } = await req.json();

        const res = await github(owner, repo, lastcommit);

        if (!res.success) {

            const { message, status } = res;

            if (status === 200) {
                return NextResponse.json({ message }, { status })
            } else {
                return NextResponse.json({ message }, { status })
            }

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
        console.log(err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}   