import { useProject } from '@/context/ProjectProvider'
import { cn } from '@/lib/utils';
import { File,  GitBranch } from 'lucide-react';
import { ReactElement } from 'react'

function MetaData() {
    const { projectdata } = useProject();

    interface metadataprops {
        title: string,
        value: string | number | undefined,
        icon?: ReactElement,
        color?: string
    }

    const metadata : metadataprops[] = [
        {
            title: "Total Files",
            value: projectdata?.totalfiles,
            icon: <File size={10} />
        }, {
            title: "Most Used Language",
            value: projectdata?.mostused,
        }, {
            title: "Branch",
            value: projectdata?.branch,
            icon: <GitBranch size={12}/>,
            color: "text-emerald-500"
        }
    ]


    return (
        <div className='bg-dark-surface border flex flex-col gap-3 xss:w-[80vw] md:w-[50vw] xl:w-[30vw] p-2 border-dark-border'>
            <p className='text-dark-text-muted text-xs'>METADATA</p>
            {metadata.map((data, index) => {
                return <div key={index} className='bg-dark-background border flex justify-between items-center border-indigo-500/30 p-3 rounded-[3px]'>
                    <p className='text-dark-text-muted text-xs'>{data.title}</p>
                    <p className={cn('text-dark-text-muted text-xs flex items-center gap-2 ', data.color)}>{data.value}{data.icon}</p>
                </div>
            })}
        </div>
    )
}

export default MetaData
