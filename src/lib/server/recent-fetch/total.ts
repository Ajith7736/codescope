import prisma from "../db/db";

export async function totalprojects(userId: string) {
    const totalprojects = await prisma.project.count({
        where: {
            userId
        }
    })

    return totalprojects;
}

export async function totalanalysis(userId: string) {
    const totalanalysis = await prisma.analysis.count({
        where: {
            project: {
                userId
            }
        }
    })

    return totalanalysis;
}

export async function totalissues(userId: string) {
    const issuesobj = await prisma.analysis.aggregate({
        where: {
            project: {
                userId
            }
        },
        _sum: { totalissues: true }
    })

    const totalissues = issuesobj._sum.totalissues;

    return totalissues;
}