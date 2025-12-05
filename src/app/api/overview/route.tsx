import { failure, success, tryCatch } from "@/lib/server/api/api";
import isRateLimitError from "@/lib/server/isRateLimitError";
import { Overviewprompt } from "@/lib/server/prompts/overviewprompt";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";



export const POST = tryCatch(async (req: Request) => {
    const { projectId, projectcode, projecttree, userId } = await req.json();
    if (!userId || !projectId) {
        return failure({ message: "UserId not found" }, 404)
    }

    const prompt = Overviewprompt(projectcode, projecttree)

    try {
        const { text } = await generateText({
            model: google("gemini-2.0-flash"),
            prompt
        })

        console.log(text);


        return success({ message: "Succcessfully created", text })

    } catch (err) {
        if (isRateLimitError(err)) {
            return failure({ message: "Rate limit reached please try again later" }, 500)
        } else {
            return failure({ message: "Something went wrong please try again later" })
        }
    }
})