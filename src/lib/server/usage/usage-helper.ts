import prisma from "../db/db";

export async function getorCreateUserUsage(userId: string) {
    const existing = await prisma.usage.findUnique({
        where: {
            userId
        }
    })

    if (existing) return existing;

    const Usage = await prisma.usage.create({
        data: {
            userId
        }
    })

    return Usage;
}


export async function getUserPlanLimits(userId: string) {
    const usage = await prisma.usage.findUnique({
        where: {
            userId
        },
        select: {
            Projectlimit: true,
            ProjectUsed: true
        }
    })

    const plantype = await prisma.subscription.findFirst({
        where: {
            userId,
            status: "active"
        },
        select: {
            plan: {
                select: {
                    name: true
                }
            }
        }
    })

    return { usage, planname: plantype?.plan.name }
}

export async function canCreateProject(userId: string): Promise<boolean> {
    const usage = await getorCreateUserUsage(userId);

    if (usage.Projectlimit === null) {
        return true
    }

    return (usage.ProjectUsed ?? 0) < (usage.Projectlimit ?? 0);
}

export async function incrementProjectUsage(userId: string) {
    const usage = await getorCreateUserUsage(userId)

    if (usage.Projectlimit !== null && (usage.ProjectUsed ?? 0) >= usage.Projectlimit) {
        throw new Error("Project Limit Reached");
    }

    await prisma.usage.update({
        where: {
            userId
        },
        data: {
            ProjectUsed: { increment: 1 }
        }
    })
}

export async function decrementProjectUsage(userId: string) {

    const usage = await getorCreateUserUsage(userId)

    const next = Math.max((usage.ProjectUsed ?? 0) - 1, 0);

    await prisma.usage.update({
        where: {
            userId
        },
        data: {
            ProjectUsed: next
        }
    })
}
