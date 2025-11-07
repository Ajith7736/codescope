import IssuesText from '@/ui/Text/IssuesText'
import ProjectText from '@/ui/Text/ProjectText'
import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import { Shield } from 'lucide-react'
import React from 'react'

function RecentAnalysis() {
    return (
        <div className='bg-light-gray dark:bg-dark-gray border border-dark-activeborder/20 rounded-md'>
            <div className='p-8 border border-dark-activeborder/20 border-t-0 border-x-0'>
                <SecondTitle>Recent Analysis</SecondTitle>
            </div>
            <div className='p-8 cursor-default'>
                <div className='flex gap-3'>
                    <div className='bg-blue-500/40 text-blue-500 h-10 rounded-md w-10 flex items-center justify-center'><Shield /></div>
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
