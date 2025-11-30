import SmallText from '@/ui/Text/SmallText'
import { useProject } from '@/context/ProjectProvider'
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"
import { Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import Number from '@/ui/Number/Number';

function OverallCard() {
    const { projectdata } = useProject();
    const overallscore: number = Math.floor((projectdata?.analysis.reduce((acc, current) => acc += current.score, 0)! / 300) * 100)



    const getcolor = (s: number) => {
        if (s >= 80) return '#10b981';
        if (s >= 50) return '#f59e0b';
        return '#ef4444';
    }

    const data = [
        {
            name: "Score",
            score: overallscore,
            fill: getcolor(overallscore)
        }
    ]



    return (
        <div className='bg-light-surface p-2 relative dark:bg-dark-surface  rounded-md text-black dark:text-white border border-light-border dark:border-dark-border m-5 xss:w-[80vw] md:w-[50vw] xl:w-[28vw] gap-4'>
            <Activity size={60} color={'rgba(131, 131, 131,0.1)'} className='absolute right-5' />
            <SmallText className='text-dark-text-muted'>OVERALL SCORE</SmallText>

                {projectdata && <div className='chart-container w-full h-[250px] flex flex-col items-center justify-center'><ResponsiveContainer width="100%" height="80%">
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="80%"
                        outerRadius="90%"
                        barSize={8}
                        data={data}
                        startAngle={180}
                        endAngle={-180}
                    >
                        <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            angleAxisId={0}
                            tick={false}
                        />
                        <RadialBar
                            background={{ fill: 'rgba(131, 131, 131,0.1)' }}
                            dataKey="score"
                            cornerRadius={10}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                    <div className='absolute inset-0 xss:mt-28 flex flex-col gap-1'>
                        <h1 className={cn(`font-extrabold text-4xl text-center`)}
                            style={{
                                color: getcolor(overallscore)
                            }}
                        ><Number n={overallscore} /></h1>
                        <h1 className='text-dark-text-muted font-semibold text-xs text-center'>SCORE</h1>
                    </div>
                    <p className='text-light-black/80 xss:text-[8px] md:text-xs dark:text-dark-text-muted'>Based on architecture,security and performance</p>
                </div>}
            </div>

    )
}

export default OverallCard
