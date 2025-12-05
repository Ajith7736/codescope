"use client"
import useFetch from '@/hooks/useFetch'
import { useSession } from '@/lib/auth-client'
import Button from '@/ui/Buttons/Button'
import BasicLoader from '@/ui/loaders/BasicLoader'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

function RepoDetail({ projectcode, projectId, projecttree }: {
    projectcode: string | undefined,
    projecttree: string | undefined,
    projectId: string | undefined
}) {
    const { data: session } = useSession()

    const [overview, setoverview] = useState<string | null>(null)
    const { data, fetchdata: handleoverview, loading } = useFetch("/api/overview", "POST", { userId: session?.user.id, projectcode, projectId, projecttree })

    useEffect(() => {
        if (data?.success) {
            setoverview(data.text)
        }
    }, [data])

    return (
        <>
            <div className='bg-dark-surface border border-dark-border rounded-md xss:w-[330px] md:w-[460px] m-5'>
                <header className='text-sm font-extrabold flex justify-between items-center p-5'>
                    Repo Overview
                    <Button variant='blue' onClick={handleoverview}>Overview</Button>
                </header>
                {!loading ?
                    <div className='p-5'>
                        {!overview ? <div className='text-[10px]'>No Details Available</div>
                            : <ReactMarkdown>
                                {overview}
                            </ReactMarkdown>}
                    </div> :
                    <div className='p-5 flex justify-center items-center'>
                        <BasicLoader />
                    </div>}
            </div>
        </>
    )
}

export default RepoDetail
