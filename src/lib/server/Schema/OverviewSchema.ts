import { z } from "zod";

export const OverviewSchema = z.object({
    summary: z.string(),
    keyFeatures: z.array(z.object({
        title : z.string().optional(),
        explaination : z.string()
    })).nonempty(),
    useCases: z.array(z.object({
        title : z.string().optional(),
        explaination : z.string()
    })).nonempty(),
    techStack: z.array(z.string()).nonempty(),
    architecture:  z.array(z.object({
        title : z.string().optional(),
        explaination : z.string()
    })).nonempty(),
    howItWorks: z.array(z.object({
        title : z.string().optional(),
        explaination : z.string()
    })).nonempty(),
    gettingStarted: z.array(z.object({
        title : z.string().optional(),
        explaination : z.string()
    })).nonempty(),
    notableFeatures: z.array(z.object({
        title : z.string().optional(),
        explaination : z.string()
    })).nonempty(),
});


