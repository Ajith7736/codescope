"use client"

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import Loading from '@/app/loading'
import { useRouter } from 'next/navigation'
import { useProject } from '@/context/ProjectProvider'
import ProjectHeader from './ProjectHeader'
import AnalysisPage from './AnalysisPage'


function AnalysisContent({ id }: { id: string }) {
  const { projectdata, setprojectdata } = useProject();
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["projectdata", id],
    queryFn: async () => {
      const res = await fetch("/api/project-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ projectId: id })
      })

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        router.push("/Dashboard/Projects")
      }

      return data;
    },
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (data) {
      setprojectdata(data.project)
    }
  }, [data])







  if (isLoading) return <Loading />

  return (
    <div className='h-screen bg-light-background dark:bg-dark-background overflow-auto flex flex-col items-center'>
      <ProjectHeader projectdata={projectdata} refetch={refetch}/>
      <AnalysisPage projectdata={projectdata} refetch={refetch}/>
    </div>
  )
}

export default AnalysisContent
