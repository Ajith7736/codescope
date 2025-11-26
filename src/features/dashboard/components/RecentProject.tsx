"use client"
import { useSession } from '@/lib/auth-client'
import { Project } from '@/types/type'
import BasicLoader from '@/ui/loaders/BasicLoader'
import ActionText from '@/ui/Text/ActionText'
import ProjectText from '@/ui/Text/ProjectText'
import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import StatusText from '@/ui/Text/StatusText'
import { useQuery } from '@tanstack/react-query'
import { ChevronRight, Code } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'


function RecentProject() {
    const router = useRouter();
    const { data: session } = useSession();
    const [projects, setprojects] = useState<Pick<Project, "id" | "projectname" | "totalfiles" | "mostused">[]>([])
    const { data, isError, isLoading } = useQuery({
        queryKey: ["RecentProject"],
        queryFn: async () => {
            const res = await fetch("/api/fetch-recent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: session?.user.id })
            })

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message)
                throw new Error(data.message)
            }

            return data;
        },
        enabled: !!session?.user.id,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        if (data && data.success) {
            setprojects(data.projects)
        }
    }, [data])


    return (
        <div className='dark:bg-dark-gray bg-light-gray border lg:w-1/2 border-dark-border rounded-md'>
            <div className='border border-dark-border border-t-0 border-x-0 p-8 flex justify-between items-center '>
                <SecondTitle>Recent Projects</SecondTitle>
                <ActionText href="/Dashboard/Projects">View All</ActionText>
            </div>
            {isLoading ? <div className='p-5 flex justify-center'><BasicLoader /></div> :
                <div>
                    {projects.length === 0 ? <div className='p-8 text-xs'>No Projects</div> : projects.map((project) => {
                        return <div key={project.id} onClick={() => router.push(`/Dashboard/Projects/${project.id}`)} className='p-8 hover:bg-light-activeborder/10 hover:dark:bg-indigo-500/5 transition-all duration-300 cursor-pointer'>
                            <div className='flex gap-4 items-center justify-between'>
                                <div className='flex gap-2'>
                                    <div className='bg-indigo-600 text-white h-10 rounded-md w-10 flex items-center justify-center'><Code aria-label="Code project" /></div>
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
