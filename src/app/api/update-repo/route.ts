import { tryCatch } from "@/lib/server/api/api";
import prisma from "@/lib/server/db/db";
import { githubrefetch } from "@/lib/server/github-refetch/github-refetch";
import { NextResponse } from "next/server";


export const PUT = tryCatch(async (req: Request) => {
    const { owner, repo, projectId, lastcommit, branch }: { owner: string, branch: string, repo: string, projectId: string, lastcommit: string } = await req.json();


    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        },
        select: {
            projectcode: true,
            commitid: true
        }
    })

    const res = await githubrefetch(owner, repo, branch, project?.projectcode, project?.commitid);

    if (!res.success) {

        const { message, status } = res;

        if (status === 200) {
            return NextResponse.json({ message }, { status })
        } else {
            return NextResponse.json({ message }, { status })
        }

    } else {
        const { RepoContent, message, mostused, status, lastcommit, treelength, treestring } = res;



        const project = await prisma.project.update({
            where: {
                id: projectId
            },
            data: {
                mostused,
                projectcode: RepoContent,
                totalfiles: treelength,
                lastcommit,
                projecttree: treestring
            }
        })


        return NextResponse.json({ message, project }, { status })
    }

})