import { failure, success, tryCatch } from "@/lib/server/api/api";
import { criticalissues } from "@/lib/server/recent-fetch/cirtical";
import { findanalysis } from "@/lib/server/recent-fetch/findanalysis";
import { findproject } from "@/lib/server/recent-fetch/findproject";
import { totalanalysis, totalissues, totalprojects } from "@/lib/server/recent-fetch/total";


export const POST = tryCatch(async (req: Request) => {

    const { userId }: { userId: string } = await req.json();

    if (!userId) {
        return failure({ message: "Something went wrong!" }, 400)
    }

    const [projects, total_projects, total_analysis, total_issues, critical_issues , analysis] = await Promise.all([
        findproject(userId),
        totalprojects(userId),
        totalanalysis(userId),
        totalissues(userId),
        criticalissues(userId),
        findanalysis(userId)
    ])


    return success({ message: "Success", projects, total_analysis, total_projects, analysis, total_issues, critical_issues })
})