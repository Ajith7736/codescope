import { z } from "zod"
export const AnalysisSchema = z.object({
    type: z.enum(["Architecture"]),
    summary: z.string(),
    totalissues: z.number(),
    score: z.number(),
    issues: z.array(
        z.object({
            severity: z.enum(["high", "medium", "low"]),
            issuetitle: z.string(),
            issuedesc: z.string(),
            issuelocation: z.string(),
            suggesstedfix: z.string(),
        })
    )
})