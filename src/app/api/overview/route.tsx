import { failure, success, tryCatch } from "@/lib/server/api/api";
import prisma from "@/lib/server/db/db";
import isRateLimitError from "@/lib/server/isRateLimitError";
import { Overviewprompt } from "@/lib/server/prompts/overviewprompt";
import { OverviewSchema } from "@/lib/server/Schema/OverviewSchema";
import { google } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";



export const POST = tryCatch(async (req: Request) => {
    const { projectId, projectcode, projecttree, userId } = await req.json();
    if (!userId || !projectId) {
        return failure({ message: "UserId not found" }, 404)
    }
    const schema = OverviewSchema;

    const prompt = Overviewprompt(projectcode, projecttree)

    try {
        const { object } = await generateObject({
            schema,
            model: google("gemini-2.5-flash"),
            prompt
        })

        const existingoverview = await prisma.overview.findFirst({
            select: { id: true },
            where: {
                projectId
            }
        })

        if (existingoverview) {
            await prisma.overview.update({
                where: {
                    id: existingoverview.id
                },
                data: {
                    keyFeatures: object.keyFeatures,
                    architecture: object.architecture,
                    gettingStarted: object.gettingStarted,
                    howItWorks: object.howItWorks,
                    notableFeatures: object.notableFeatures,
                    projectId,
                    summary: object.summary,
                    techStack: object.techStack,
                    useCases: object.useCases
                }
            })
        } else {
            await prisma.overview.create({
                data: {
                    keyFeatures: object.keyFeatures,
                    architecture: object.architecture,
                    gettingStarted: object.gettingStarted,
                    howItWorks: object.howItWorks,
                    notableFeatures: object.notableFeatures,
                    projectId,
                    summary: object.summary,
                    techStack: object.techStack,
                    useCases: object.useCases
                }
            })
        }



        return success({ message: "Succcessfully created", object })

    } catch (err) {
        if (isRateLimitError(err)) {
            console.log(err)
            return failure({ message: "Rate limit reached please try again later" }, 500)
        } else {
            console.log(err)
            return failure({ message: "Something went wrong please try again later" })
        }
    }
})