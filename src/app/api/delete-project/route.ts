import { failure, success, tryCatch } from "@/lib/server/api/api";
import prisma from "@/lib/server/db/db";
import { decrementProjectUsage } from "@/lib/server/usage/usage-helper";
import { NextResponse } from "next/server";

export const DELETE = tryCatch(async (req: Request) => {
    const { projectId, userId } = await req.json();

    if (!projectId || !userId) {
        return failure({ message: "projectId or userId is missing" })
    }

    const deleted = await prisma.project.delete({
        where: {
            userId,
            id: projectId
        }
    })

    if (!deleted) {
        return failure({ message: "Couldnt delete the project" })
    }

    await decrementProjectUsage(userId);

    return success({ message: "Successfully deleted the project" })
})