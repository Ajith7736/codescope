import IssuesText from '@/ui/Text/IssuesText'
import ProjectText from '@/ui/Text/ProjectText'
import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import { Shield } from 'lucide-react'


function RecentAnalysis() {
    return (
        <div className='border border-dark-border rounded-md'>
            <div className='p-8 border border-dark-border border-t-0 border-x-0'>
                <SecondTitle>Recent Analysis</SecondTitle>
            </div>
            <div className='p-8 cursor-default'>
                <div className='flex gap-3'>
                    <div className='bg-indigo-600/40 text-indigo-500 h-10 rounded-md w-10 flex items-center justify-center'><Shield /></div>
                    <div>
                        <ProjectText>Ecommerce Website</ProjectText>
                        <SmallText>Security Analysis</SmallText>
                    </div>
                    <div>
                        <IssuesText number={3} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentAnalysis
