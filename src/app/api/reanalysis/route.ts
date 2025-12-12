import { failure, success, tryCatch } from "@/lib/server/api/api";
import prisma from "@/lib/server/db/db";
import isRateLimitError from "@/lib/server/isRateLimitError";
import architectureprompt from "@/lib/server/prompts/architectureprompt";
import performanceprompt from "@/lib/server/prompts/performanceprompt";
import securityprompt from "@/lib/server/prompts/securityprompt";
import AnalysisSchema from "@/lib/server/Schema/AnalysisSchema";
import { Project } from "@/types/type";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

type TransactionClient = Parameters<typeof prisma.$transaction>[0] extends (
  arg: infer T
) => any
  ? T
  : never;


export const PUT = tryCatch(async (req: Request) => {

    const { project, analysisId, analysistype }: { project: Project, analysisId: string, analysistype: "Architecture" | "Security" | "Performance" } = await req.json();

    const previousanalysis = await prisma.analysis.findUnique({
        where: {
            id: analysisId
        },
        include: {
            issues: true
        }
    })


    const prompt = analysistype === "Architecture" ? architectureprompt(project.projectcode, project.projecttree, JSON.stringify(previousanalysis)) : analysistype === "Security" ? securityprompt(project.projectcode, project.projecttree, JSON.stringify(previousanalysis)) : performanceprompt(project.projectcode, project.projecttree, JSON.stringify(previousanalysis));
    const schema = AnalysisSchema(analysistype)

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
            model: google("gemini-2.5-flash"),
            schema,
            prompt
        })

        const parsed = schema.safeParse(object);

        if (!parsed.success) {
            await prisma.analysis.update({
                where: { id: analysisId },
                data: {
                    status: "failed"
                }
            })

            return failure({ message: "Couldnt complete Analysis" })
        }


        await prisma.$transaction(async (tx: TransactionClient) => {
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
                    suggesstedcode: issue.suggesstedcode,
                    suggesstedcodelanguage: issue.suggesstedcodelanguage,
                    analysisId
                }))
            })
        })

        return success({ message: "Analysis successfull" })

    } catch (err) {
        await prisma.analysis.update({
            where: { id: analysisId },
            data: {
                status: "failed"
            }
        })
        if (isRateLimitError(err)) {
            return failure({ message: "Rate limit reached please try again later" }, 500)
        } else {
            return failure({ message: "Something went wrong please try again" }, 500)
        }
    }

})