import prisma from "../db/db";

export async function getUserdata(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            email: true,
            emailVerified: true,
            name: true,
            image: true,
            razorpay_customer_id: true,
            subscription_status: true,
            accounts: {
                select: {
                    providerId: true,
                    createdAt: true,
                    accountId: true
                }
            }
        }
    })

    return user;
}

export async function getActiveUserSubscription(userId: string) {
    const subscription = await prisma.subscription.findFirst({
        where: {
            userId,
            status: "active"
        },
        select: {
            id: true,
            planId: true,
            plan: {
                select: {
                    razorpayPlanId: true,
                    name: true
                }
            },
            status: true,
            createdAt: true,
            activated_at: true,
            current_end: true,
            paid_count: true,
            remaining_count: true
        }
    })

    return subscription;
}