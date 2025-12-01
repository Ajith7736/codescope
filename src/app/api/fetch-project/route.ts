import prisma from "@/lib/server/db/db";
import { failure, success, tryCatch } from "../../../lib/server/api/api";

export const POST = tryCatch(async (req: Request) => {
    const { userId } = await req.json();

    if (!userId) {
        return failure({ message: "userId not provided" })
    }
    
    const project = await prisma.project.findMany({
        select: { projectname: true, id: true, createdAt: true, userId: true, mostused: true, totalfiles: true },
        where: { userId }
    })


    if (project.length === 0) {
        return success({ message: "No project" })
    }

    return success({ message: "Project fetched successfully", project })
}) 