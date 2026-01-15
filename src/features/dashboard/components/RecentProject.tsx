"use client"

import { Project } from '@/types/type'
import BasicLoader from '@/ui/loaders/BasicLoader'
import ActionText from '@/ui/Text/ActionText'
import ProjectText from '@/ui/Text/ProjectText'
import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import { ChevronRight, Code } from 'lucide-react'
import { useRouter } from 'next/navigation'


function RecentProject({ projects, isLoading }: { projects: Project[], isLoading: boolean }) {
    const router = useRouter();


    return (
        <div className='dark:bg-dark-gray bg-light-gray border xss:w-xs md:w-sm lg:w-1/2 border-light-border dark:border-dark-border rounded-md w-md'>
            <div className='border dark:border-dark-border border-t-0 border-x-0 p-8 border-light-border flex justify-between items-center '>
                <SecondTitle>Recent Projects</SecondTitle>
                <ActionText href="/Dashboard/Projects" className='uppercase text-indigo-500 font-extrabold tracking-widest'>View All</ActionText>
            </div>
            {isLoading ? <div className='p-5 flex justify-center'><BasicLoader /></div> :
                <div>
                    {projects.length === 0 ? <div className='p-8 text-xs'>No Projects</div> : projects.map((project,index) => {
                        return <div key={project.id} onClick={() => router.push(`/Dashboard/Projects/${project.id}`)} className={`p-8 hover:bg-light-accent/5 hover:dark:bg-dark-accent/10 transition-all duration-300 cursor-pointer ${index !== projects.length - 1 && 'border-b border-light-border dark:border-dark-border'}`}>
                            <div className='flex gap-4 items-center justify-between'>
                                <div className='flex gap-2 items-center'>
                                    <div className='bg-indigo-600 text-white md:h-8 rounded-md md:w-8 xss:w-7 xss:h-7 p-1 flex items-center justify-center'><Code aria-label="Code project" strokeWidth={3}/></div>
                                    <div>
                                        <ProjectText>{project.projectname}</ProjectText>
                                        <div className='flex gap-2'>
                                            <SmallText>{project.totalfiles} Files •</SmallText>
                                            <SmallText>{project.mostused}</SmallText>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center gap-1'>
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            }
        </div >
    )
}

export default RecentProject
