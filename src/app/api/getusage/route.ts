import { success, tryCatch } from "@/lib/server/api/api";
import prisma from "@/lib/server/db/db";

export const POST = tryCatch(async (req: Request) => {
    const { userId } = await req.json();

    const usage = await prisma.usage.findUnique({
        where: {
            userId
        }
    })

    return success({ message: "Successfully fetched", usage })
})