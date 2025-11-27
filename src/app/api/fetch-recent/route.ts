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

        const analysis = await prisma.analysis.findMany({
            select: { id: true, project: { select: { projectname: true } }, totalissues: true, type: true },
            where: {
                project: {
                    userId
                }
            },
            orderBy: { updatedAt: "desc" },
            take : 3
        })


        return NextResponse.json({ success: true, message: "Successfully fetched", projects, analysis }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 })
    }
}