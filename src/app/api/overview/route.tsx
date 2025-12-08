import { failure, success, tryCatch } from "@/lib/server/api/api";
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
    const schema = OverviewSchema();

    const prompt = Overviewprompt(projectcode, projecttree)

    try {
        const { object } = await generateObject({
            schema,
            model: google("gemini-2.5-flash"),
            prompt
        })

        console.log(object);


        return success({ message: "Succcessfully created", object })

    } catch (err) {
        if (isRateLimitError(err)) {
            console.log(err)
            return failure({ message: "Rate limit reached please try again later" }, 500)
        } else {
            return failure({ message: "Something went wrong please try again later" })
        }
    }
})