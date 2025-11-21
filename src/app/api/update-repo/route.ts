import prisma from "@/lib/server/db/db";
import filtertree from "@/lib/server/github-fetch/filtertree";
import getbranch from "@/lib/server/github-fetch/getbranch";
import getcontent from "@/lib/server/github-fetch/getcontent";
import gettree from "@/lib/server/github-fetch/gettree";
import github from "@/lib/server/github-fetch/github";
import { NextResponse } from "next/server";

export async function UPDATE(req: Request) {
    try {
        const { owner, repo, projectId }: { owner: string, repo: string, projectId: string } = await req.json();

        const res = await github(owner, repo);

        if (!res.success) {

            const { message, status } = res;
            return NextResponse.json({ message }, { status })

        } else {
            const { RepoContent, message, mostused, status, tree } = res;

            const project = await prisma.project.update({
                where: {
                    id: projectId,
                    projectname: repo
                },
                data: {
                    mostused,
                    projectcode: RepoContent,
                    totalfiles: tree.length
                }
            })

            return NextResponse.json({ message, project }, { status })
        }
    } catch (err) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}   