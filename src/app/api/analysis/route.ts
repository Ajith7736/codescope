import { NextResponse } from "next/server";
import { generateObject } from "ai"
import { google } from "@ai-sdk/google"
import { Project } from "@/types/type";
import architectureprompt from "@/lib/server/prompts/architectureprompt";
import prisma from "@/lib/server/db/db";
import isRateLimitError from "@/lib/server/isRateLimitError";
import securityprompt from "@/lib/server/prompts/securityprompt";
import performanceprompt from "@/lib/server/prompts/performanceprompt";
import AnalysisSchema from "@/lib/server/Schema/AnalysisSchema";



export async function POST(req: Request) {
    try {

        const { project, analysistype }: { project: Project, analysistype: "Architecture" | "Security" | "Performance" } = await req.json();
        const prompt = analysistype === "Architecture" ? architectureprompt(project.projectcode, project.projecttree) : analysistype === "Security" ? securityprompt(project.projectcode, project.projecttree) : performanceprompt(project.projectcode, project.projecttree);
        const schema = AnalysisSchema(analysistype)

        if (!project) return NextResponse.json({ success: false, message: "Data error , please try again" }, { status: 400 })

        const Analysis = await prisma.analysis.create({
            data: {
                projectId: project.id,
                type: analysistype,
            }
        })


        try {

            await prisma.analysis.update({
                where: {
                    id: Analysis.id
                },
                data: {
                    status: "Processing"
                }
            })

            const { object } = await generateObject({
                model: google("gemini-2.0-flash"),
                schema,
                prompt
            })

            const parsed = schema.safeParse(object);

            if (!parsed.success) {
                await prisma.analysis.update({
                    where: { id: Analysis.id },
                    data: {
                        status: "failed"
                    }
                })

                return NextResponse.json({ success: false, message: "Couldnt complete Analysis" }, { status: 400 })
            }

            await prisma.$transaction(async (tx) => {
                await tx.analysis.update({
                    where: {
                        id: Analysis.id
                    },
                    data: {
                        status: "completed",
                        score: object.score,
                        summary: object.summary,
                        totalissues: object.totalissues,
                    }
                })

                await tx.issues.createMany({
                    data: object.issues.map((issue) => ({
                        issuedesc: issue.issuedesc,
                        issuelocation: issue.issuelocation,
                        issuetitle: issue.issuetitle,
                        severity: issue.severity,
                        suggesstedfix: issue.suggesstedfix,
                        suggesstedcode: issue.suggesstedcode,
                        suggesstedcodelanguage: issue.suggesstedcodelanguage,
                        analysisId: Analysis.id
                    }))
                })
            })


            return NextResponse.json({ success: true, message: "recieved" }, { status: 200 })
        } catch (err) {
            await prisma.analysis.update({
                where: { id: Analysis.id },
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
        console.log(err);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 })
    }
}