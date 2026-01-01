import prisma from "../db/db";

export async function findanalysis(userId: string) {
    const analysis = await prisma.analysis.findMany({
        select: { id: true, project: { select: { projectname: true } }, totalissues: true, type: true },
        where: {
            project: {
                userId
            }
        },
        orderBy: { updatedAt: "desc" },
        take: 3
    })

    return analysis;
}