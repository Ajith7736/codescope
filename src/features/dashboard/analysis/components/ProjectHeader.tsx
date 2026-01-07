import useFetch from '@/hooks/useFetch'
import { Project } from '@/types/type'
import Button from '@/ui/Buttons/Button'
import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import { RefreshCcw } from 'lucide-react'
import { useEffect } from 'react'

function ProjectHeader({ projectdata, refetch }: { projectdata: Pick<Project, "lastcommit" | "branch" | "projectname" | "id" | "ownername"> | null, refetch: Function }) {

    const {
        data: successres,
        loading: updateloader,
        fetchdata: handleupdate
    } = useFetch(
        "/api/update-repo",
        "PUT",
        {
            owner: projectdata?.ownername,
            repo: projectdata?.projectname,
            projectId: projectdata?.id,
            lastcommit: projectdata?.lastcommit,
            branch: projectdata?.branch
        })


    useEffect(() => {
        if (successres) {
            refetch();
        }
    }, [successres])

    return (
        <div className='p-5 border w-full bg-light-surface dark:bg-dark-surface flex justify-between items-center border-light-border dark:border-dark-border border-t-0 border-x-0'>
            <div className='w-[50%]'>
                <SecondTitle>{projectdata?.projectname}</SecondTitle>
                <div className='mt-1'>
                    <SmallText textcolor='text-light-black/80 dark:text-dark-text-muted' className='lg:text-xs'>Last commit • {projectdata?.lastcommit}</SmallText>
                </div>
            </div>
            <div>
                {updateloader ? <Button variant='blue'><RefreshCcw size={15} className='animate-spin' />fetching</Button> : <Button variant='blue' onClick={() => handleupdate()}><RefreshCcw size={15} />Re-fetch</Button>}
            </div>
        </div>
    )
}

export default ProjectHeader
