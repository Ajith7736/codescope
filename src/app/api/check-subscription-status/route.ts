import { failure, success, tryCatch } from "@/lib/server/api/api";
import prisma from "@/lib/server/db/db";

export const POST = tryCatch(async (req: Request) => {
    const { subscriptionId, userId } = await req.json();

    if (!subscriptionId || !userId) {
        return failure({ message: "Subscription Id or User Id not recieved" })
    }

    const subscription = await prisma.subscription.findUnique({
        where: {
            razorpay_subscription_id: subscriptionId,
            userId
        },
        select: {
            status: true
        }
    })

    if (!subscription) {
        return failure({ message: "subscriptionId and userId are required" })
    }

    return success({ message: "Successfully Fetched", status: subscription.status });
})