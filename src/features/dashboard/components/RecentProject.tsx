import ActionText from '@/ui/Text/ActionText'
import ProjectText from '@/ui/Text/ProjectText'
import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import StatusText from '@/ui/Text/StatusText'
import { Code } from 'lucide-react'
import Link from 'next/link'

function RecentProject() {
    return (
        <div className='dark:bg-dark-gray bg-light-gray border lg:w-1/2 border-dark-activeborder/20 rounded-md'>
            <div className='border border-dark-activeborder/20 border-t-0 border-x-0 p-8 flex justify-between items-center '>
                <SecondTitle>Recent Projects</SecondTitle>
                <ActionText href="/Dashboard/Projects">View All</ActionText>
            </div>
            <div>
                <div className='p-8 hover:bg-light-activeborder/10 hover:dark:bg-dark-hovergray transition-all duration-300 cursor-pointer'>
                    <div className='flex gap-4 items-center justify-between'>
                        <div className='flex gap-2'>
                            <div className='bg-blue-500 text-white h-10 rounded-md w-10 flex items-center justify-center'><Code aria-label="Code project" /></div>
                            <div>
                                <ProjectText>Ecommerce Website</ProjectText>
                                <div className='flex gap-2'>
                                    <SmallText>47 files</SmallText>
                                    <SmallText>Typescript</SmallText>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-1'>
                            <SecondTitle>78</SecondTitle>
                            <StatusText variant='healthy' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentProject
