import prisma from "@/lib/server/db/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { projectId } = await req.json();

        if (!projectId) {
            return NextResponse.json({ message: "projectId not recieved" }, { status: 400 })
        }

        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
                analysis: {
                    include: {
                        issues: true
                    }
                }
            }
        })

        if (!project) return NextResponse.json({ message: "project not found" }, { status: 404 })

        return NextResponse.json({ message: "success", project }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}