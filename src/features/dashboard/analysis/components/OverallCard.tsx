import { Analysis, AnalysisProps } from '@/types/type'
import ProjectText from '@/ui/Text/ProjectText'
import SmallText from '@/ui/Text/SmallText'
import { GitBranch, Shield, Zap } from 'lucide-react'
import Overall from './Overall'
import { useProject } from '@/context/ProjectProvider'

function OverallCard() {
    const { projectdata } = useProject();
    const overallscore: number = Math.floor((projectdata?.analysis.reduce((acc, current) => acc += current.score, 0)! / 300) * 100);


    const Analysis: AnalysisProps[] = [
        {
            icon: <GitBranch />,
            score: projectdata?.analysis.find((item) => item.type === "Architecture")?.score || 0,
            type: "Architecture"
        },
        {
            icon: <Shield />,
            score: projectdata?.analysis.find((item) => item.type === "Security")?.score || 0,
            type: "Security"
        }, {
            icon: <Zap />,
            score: projectdata?.analysis.find((item) => item.type === "Performance")?.score || 0,
            type: "Performance"
        }
    ]

    return (
        <div className='bg-light-activeborder/10 dark:bg-dark-gray flex flex-col lg:flex-row md:items-center gap-8 rounded-md text-black dark:text-white border border-light-activeborder/20 p-8 m-5 '>
            <div className='flex flex-col gap-2'>
                <ProjectText>Overall Code Quality</ProjectText>
                <h1 className='text-3xl md:text-4xl font-extrabold'>{overallscore}/100</h1>
                <SmallText textcolor='text-light-black/80 dark:text-dark-white/80'>Based on architecture,security and performance</SmallText>
            </div>
            <div className='flex gap-5'>
                {Analysis.map((item) => {
                    return <Overall key={item.type} item={item} />
                })}
            </div>
        </div>
    )
}

export default OverallCard
