import { z } from "zod"
export default function AnalysisSchema(analysistype: "Architecture" | "Security" | "Performance") {
    const schema = z.object({
        analysis : z.object({
            type: z.enum([analysistype]),
            totalissues: z.number(),
            score: z.number(),
            issues: z.array(
                z.object({
                    severity: z.enum(["high", "medium", "low"]),
                    issuetitle: z.string(),
                    issuedesc: z.string(),
                    issuelocation: z.string(),
                    suggesstedfix: z.string(),
                    suggesstedcode: z.string().optional(),
                    suggesstedcodelanguage: z.string().optional()
                })
            )
        }),
        summary: z.string()
    })

    return schema;
}