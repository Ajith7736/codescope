import { z } from "zod"

export function OverviewSchema() {
    const schema = z.object({
        summary: z.string(),
        keyfeatures: z.array(z.string()),
        techstack: z.array(z.string()),
        Architecture : z.array(z.string()),
        Howitworks : z.array(z.string()),
        gettingstarted : z.array(z.string()),
        NotableFeatures : z.array(z.string())
    })

    return schema;
}