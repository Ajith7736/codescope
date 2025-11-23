import { Project } from "@/generated/prisma/client";
import prisma from "@/lib/server/db/db";
import isRateLimitError from "@/lib/server/isRateLimitError";
import architectureprompt from "@/lib/server/prompts/architectureprompt";
import { AnalysisSchema } from "@/lib/server/Schema/AnalysisSchema";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const { project, analysisId }: { project: Project, analysisId: string } = await req.json();
        const prompt = architectureprompt(project.projectcode, project.projecttree);

        try {

            await prisma.analysis.update({
                where: {
                    id: analysisId
                },
                data: {
                    status: "Processing"
                }
            })

            const { object } = await generateObject({
                model: google("gemini-2.0-flash"),
                schema: AnalysisSchema,
                prompt
            })

            const parsed = AnalysisSchema.safeParse(object);

            if (!parsed.success) {
                await prisma.analysis.update({
                    where: { id: analysisId },
                    data: {
                        status: "failed"
                    }
                })

                return NextResponse.json({ success: false, message: "Couldnt complete Analysis" }, { status: 400 })
            }

            await prisma.$transaction(async (tx) => {
                await tx.analysis.update({
                    where: {
                        id: analysisId
                    },
                    data: {
                        status: "completed",
                        score: object.score,
                        summary: object.summary,
                        totalissues: object.totalissues
                    }
                })

                await tx.issues.deleteMany({
                    where: {
                        analysisId
                    }
                })


                await tx.issues.createMany({
                    data: object.issues.map((issue) => ({
                        issuedesc: issue.issuedesc,
                        issuelocation: issue.issuelocation,
                        issuetitle: issue.issuetitle,
                        severity: issue.severity,
                        suggesstedfix: issue.suggesstedfix,
                        analysisId
                    }))
                })
            })

            return NextResponse.json({ success: true, message: "Analysis successfull" }, { status: 200 })

        } catch (err) {
            await prisma.analysis.update({
                where: { id: analysisId },
                data: {
                    status: "failed"
                }
            })
            if (isRateLimitError(err)) {
                return NextResponse.json({ success: false, message: "Rate limit reached please try again later" }, { status: 500 })
            } else {
                return NextResponse.json({ success: false, message: "Something went wrong please try again" }, { status: 500 })
            }
        }

    } catch (err) {
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 })
    }
}