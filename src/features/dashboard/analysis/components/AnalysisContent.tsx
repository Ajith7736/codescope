"use client"

import { Activity, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import Loading from '@/app/loading'
import { useRouter } from 'next/navigation'
import { useProject } from '@/context/ProjectProvider'
import ProjectHeader from './ProjectHeader'
import AnalysisPage from './AnalysisPage'
import { usePage } from '@/context/PageProvider'
import OverviewPage from '../../Overview/components/OverviewPage'


function AnalysisContent({ id }: { id: string }) {
  const { projectdata, setprojectdata } = useProject();
  const { currentprojectpage } = usePage();
  const router = useRouter();

  const { data, isLoading, refetch , isRefetching } = useQuery({
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
      <ProjectHeader projectdata={projectdata} refetch={refetch} />
      <Activity mode={currentprojectpage === "analysis" ? 'visible' : 'hidden'}>
        <AnalysisPage projectdata={projectdata} refetch={refetch} />
      </Activity>
      <Activity mode={currentprojectpage === "overview" ? 'visible' : 'hidden'}>
        <OverviewPage overview={projectdata?.overview} isRefetching={isRefetching} projectdata={projectdata} refetch={refetch} />
      </Activity>
    </div>
  )
}

export default AnalysisContent
