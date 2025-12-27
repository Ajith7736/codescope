import { failure, success, tryCatch } from "@/lib/server/api/api"
import prisma from "@/lib/server/db/db"
import Razorpay from "razorpay"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const getrazorpay = () => {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        throw new Error("Razorpay id or key is missing")
    }
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
}

export const POST = tryCatch(async (req: Request) => {
    const { planId, userId } = await req.json();

    if (!planId || !userId) {
        return failure({ message: "planId and userId are required" })
    }

    const existingsubscription = await prisma.subscription.findFirst({
        where: {
            userId,
            status: "active"
        },
        select: {
            id: true
        }
    })


    if (existingsubscription) {
        return failure({ message: "An active subscription already exists" })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) {
        return failure({ message: "User not found " })
    }

    const razorpay = getrazorpay();

    const subscription = await razorpay.subscriptions.create({
        plan_id: planId,
        total_count: 12,
        notes: {
            userId,
            planId
        }
    })

    const plan = await prisma.plan.findUnique({
        where: {
            razorpayPlanId: planId
        },
        select: {
            id: true
        }
    })

    if (!plan) {
        return failure({ message: "Plan not found in DB" })
    }

    if (!subscription) {
        return failure({ message: "subscription failed" })
    }

    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            razorpay_customer_id: subscription.customer_id
        }
    })



    return success({ id: subscription.id, key: process.env.RAZORPAY_KEY_ID, entity: subscription.entity });

})