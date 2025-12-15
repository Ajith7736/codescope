import { success, tryCatch } from "@/lib/server/api/api"
import prisma from "@/lib/server/db/db"

export const GET = tryCatch(async () => {
    const plans = await prisma.plan.findMany({})

    return success({ plans });
})