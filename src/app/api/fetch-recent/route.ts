import { success } from "@/lib/server/api/api";
import prisma from "@/lib/server/db/db";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const { userId }: { userId: string } = await req.json();

        if (!userId) {
            return NextResponse.json({ sucess: false, message: "Something went wrong!" }, { status: 400 })
        }

        const projects = await prisma.project.findMany({
            select: { id: true, projectname: true, totalfiles: true, mostused: true },
            where: {
                userId
            },
            orderBy: { createdAt: "desc" },
            take: 3
        })

        const totalprojects = await prisma.project.count({
            where: {
                userId
            }
        })

        const totalanalysis = await prisma.analysis.count({
            where: {
                project: {
                    userId
                }
            }
        })

        const issuesobj = await prisma.analysis.aggregate({
            _sum: { totalissues: true }
        })

        const totalissues = issuesobj._sum.totalissues;

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


        return success({ message: "Success", projects, totalanalysis, totalprojects, analysis, totalissues, criticalissues })
    } catch (err) {
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 })
    }
}