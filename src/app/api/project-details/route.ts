import { failure, success, tryCatch } from "@/lib/server/api/api";
import prisma from "@/lib/server/db/db";
import { NextResponse } from "next/server";

export const POST = tryCatch(async (req: Request) => {
    const { projectId } = await req.json();

    if (!projectId) {
        return failure({ message: "projectId not recieved" })
    }

    const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: {
            analysis: {
                include: {
                    issues: true
                }
            },
            overview : true
        }
    })


    if (!project) return failure({ message: "project not found" }, 404)

    return success({ message: "success", project })
}
)