import { AnalysisProps } from '@/types/type'
import ProjectText from '@/ui/Text/ProjectText'
import SmallText from '@/ui/Text/SmallText'
import { GitBranch, Shield, Zap } from 'lucide-react'
import Overall from './Overall'

function OverallCard() {

    const Analysis: AnalysisProps[] = [
        {
            icon: <GitBranch />,
            score: 45,
            type: "Architecture"
        },
        {
            icon: <Shield />,
            score: 78,
            type: "Security"
        }, {
            icon: <Zap />,
            score: 62,
            type: "Performance"
        }
    ]

    return (
        <div className='bg-light-activeborder/10 dark:bg-dark-gray flex flex-col md:flex-row md:items-center gap-8 rounded-md text-black dark:text-white border border-light-activeborder/20 p-8 m-5 w-fit'>
            <div className='flex flex-col gap-2'>
                <ProjectText>Overall Code Quality</ProjectText>
                <h1 className='text-3xl md:text-4xl font-extrabold'>78/100</h1>
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
