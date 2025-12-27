import { recentanalysis } from '@/types/type'
import StatusIcon from '@/ui/icon/StatusIcon'
import BasicLoader from '@/ui/loaders/BasicLoader'
import IssuesText from '@/ui/Text/IssuesText'
import ProjectText from '@/ui/Text/ProjectText'
import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'


function RecentAnalysis({ analysis, isLoading }: { analysis: recentanalysis[], isLoading: boolean }) {


    return (
        <div className='border dark:border-dark-border border-light-border rounded-md xss:w-xs md:w-md'>
            <div className='p-8 border border-light-border dark:border-dark-border border-t-0 border-x-0'>
                <SecondTitle>Recent Analysis</SecondTitle>
            </div>
            {isLoading ? <div className='p-5 flex justify-center'><BasicLoader /></div> : analysis.length !== 0 ? analysis.map((item, index) => {
                return <div key={item.id} className={`p-8 cursor-default ${index !== analysis.length - 1 && 'border-b border-light-border dark:border-dark-border'}`}>
                    <div className='flex gap-5 items-center justify-between'>
                        <div className='flex gap-4 items-center'>
                            <div>
                                <StatusIcon type={item.type} variant='low' />
                            </div>
                            <div>
                                <ProjectText>{item.project.projectname}</ProjectText>
                                <SmallText>{item.type} Analysis</SmallText>
                            </div>
                        </div>
                        <div>
                            <IssuesText number={item.totalissues!} />
                        </div>
                    </div>
                </div>

            }) : <div className='p-8 text-xs text-center'>No Projects</div>}

        </div>
    )
}

export default RecentAnalysis
