import { failure, success, tryCatch } from "@/lib/server/api/api";
import prisma from "@/lib/server/db/db";

export const POST = tryCatch(async (req: Request) => {
    const data = await req.json();

    if (!data) {
        return failure({ message: "No message data received" })
    }

    await prisma.messages.create({
        data
    })

    return success({ message: "Message sent successfully" })
})