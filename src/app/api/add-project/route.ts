import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { project } = await req.json();
        console.log(project);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}