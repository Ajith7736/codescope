import prisma from "../db/db";

export async function findproject(userId: string) {
    const projects = await prisma.project.findMany({
        select: { id: true, projectname: true, totalfiles: true, mostused: true },
        where: {
            userId
        },
        orderBy: { createdAt: "desc" },
        take: 3
    })

    return projects;
}