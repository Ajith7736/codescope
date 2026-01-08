import prisma from "../db/db";

export async function getPlan(planId: string): Promise<string | undefined> {
    const plan = await prisma.plan.findUnique({
        where: {
            razorpayPlanId: planId
        },
        select: {
            name: true
        }
    })

    return plan?.name;
}