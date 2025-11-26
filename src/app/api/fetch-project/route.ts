import prisma from "@/lib/server/db/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = await req.json();
        if (!userId) {
            return NextResponse.json({ message: "userId not recieved" }, { status: 400 })
        }
        const project = await prisma.project.findMany({
            select: { projectname: true, id: true, createdAt: true, userId: true, mostused: true, totalfiles: true },
            where: { userId }
        })

        if (project.length === 0) {
            return NextResponse.json({ success: false, message: "No project found with this username" }, { status: 404 })
        }


        return NextResponse.json({ success: true, message: "Project fetched successfully", project }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 })
    }
}