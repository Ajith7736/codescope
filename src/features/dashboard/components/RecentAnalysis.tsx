import { Analysis, Project, recentanalysis } from '@/types/type'
import StatusIcon from '@/ui/icon/StatusIcon'
import IssuesText from '@/ui/Text/IssuesText'
import ProjectText from '@/ui/Text/ProjectText'
import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import { Shield } from 'lucide-react'


function RecentAnalysis({ analysis, isLoading }: { analysis: recentanalysis[], isLoading: boolean }) {


    return (
        <div className='border border-dark-border rounded-md'>
            <div className='p-8 border border-dark-border border-t-0 border-x-0'>
                <SecondTitle>Recent Analysis</SecondTitle>
            </div>
            {analysis.length !== 0 ? analysis.map((item) => {
                return <div key={item.id} className='p-8 cursor-default'>
                    <div className='flex gap-5 items-center'>
                        <div>
                            <StatusIcon type={item.type} variant='low' />
                        </div>
                        <div>
                            <ProjectText>{item.project.projectname}</ProjectText>
                            <SmallText>{item.type} Analysis</SmallText>
                        </div>
                        <div>
                            <IssuesText number={item.totalissues!} />
                        </div>
                    </div>
                </div>

            }) : <div className='p-8 text-xs'>No Projects</div>}
        </div>
    )
}

export default RecentAnalysis
