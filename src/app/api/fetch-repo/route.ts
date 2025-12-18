import { failure, success, tryCatch } from "@/lib/server/api/api";
import prisma from "@/lib/server/db/db";
import github from "@/lib/server/github-fetch/github";
import { NextResponse } from "next/server";

export const POST = tryCatch(async (req: Request) => {
    const { owner, repo, userId }: { owner: string, repo: string, userId: string } = await req.json();

    const existingproject = await prisma.project.findFirst({
        where: {
            projectname: repo,
            ownername: owner,
            userId
        }
    })

    if (existingproject) {
        return failure({ message: "Repo already added" }, 409)
    }

    const res = await github(owner, repo);

    if (!res.success) {
        const { message, status } = res;
        return failure({ message }, status)

    } else {
        const { RepoContent, branch, message, mostused, treestring, lastcommit, treelength } = res;

        const project = await prisma.project.create({
            data: {
                projectname: repo,
                ownername: owner,
                projectcode: RepoContent,
                projecttree: treestring,
                mostused,
                lastcommit,
                branch,
                totalfiles: treelength,
                userId: userId
            }
        })

        return success({ message, project })

    }
}
)