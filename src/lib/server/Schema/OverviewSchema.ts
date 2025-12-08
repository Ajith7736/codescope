import { z } from "zod";

export const OverviewSchema = z.object({
    summary: z.string(),
    keyFeatures: z.array(z.string()).nonempty(),
    techStack: z.array(z.string()).nonempty(),
    architecture: z.array(z.string()).nonempty(),
    howItWorks: z.array(z.string()).nonempty(),
    gettingStarted: z.array(z.string()).nonempty(),
    notableFeatures: z.array(z.string()).nonempty(),
});

export type Overview = z.infer<typeof OverviewSchema>;

