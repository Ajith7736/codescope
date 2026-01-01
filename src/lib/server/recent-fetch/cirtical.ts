import prisma from "../db/db";

export async function criticalissues(userId: string) {
    const criticalissues = await prisma.issues.count({
        where: {
            analysis: {
                project: {
                    userId
                }
            },
            severity: 'high'
        }
    })

    return criticalissues;
}