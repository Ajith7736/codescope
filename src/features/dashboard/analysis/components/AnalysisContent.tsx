"use client"

import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import { RefreshCcw } from 'lucide-react'
import OverallCard from './OverallCard'
import { Activity, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import Loading from '@/app/loading'
import useFetch from '@/hooks/useFetch'
import Button from '@/ui/Buttons/Button'
import { useRouter } from 'next/navigation'
import { useProject } from '@/context/ProjectProvider'
import MetaData from './MetaData'
import Overview from './Overview'
import AnalysisCard from './Analysis'


function AnalysisContent({ id }: { id: string }) {
  const [currentanalysis, setcurrentanalysis] = useState<"Architecture" | "Security" | "Performance">("Architecture");
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


  const Analysis: ("Architecture" | "Security" | "Performance")[] = ["Architecture", "Security", "Performance"]


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
      lastcommit: projectdata?.lastcommit
    })


  useEffect(() => {
    if (successres) {
      refetch();
    }
  }, [successres])


  if (isLoading) return <Loading />

  return (
    <div className='h-screen bg-light-background dark:bg-dark-background overflow-auto flex flex-col items-center'>
      <div className='p-5 border w-full bg-light-surface dark:bg-dark-surface flex justify-between items-center border-light-border dark:border-dark-border border-t-0 border-x-0'>
        <div className='w-[50%]'>
          <SecondTitle>{projectdata?.projectname}</SecondTitle>
          <div className='mt-1'>
            <SmallText textcolor='text-light-black/80 dark:text-dark-text-muted' className='lg:text-xs'>Last commit • {projectdata?.lastcommit}</SmallText>
          </div>
        </div>
        <div>
          {updateloader ? <Button variant='blue'><RefreshCcw size={15} className='animate-spin' />fetching</Button> : <Button variant='blue' onClick={handleupdate}><RefreshCcw size={15} />Re-fetch</Button>}
        </div>
      </div>
      <div className='flex flex-col xl:flex-row xss:items-center xl:items-start'>
        <div>
          <div className='flex flex-col items-center'>
            <OverallCard />
          </div>

          <div className='flex flex-col items-center'>
            <MetaData />
          </div>

          {projectdata && <div className='flex flex-col items-center'>
            <Overview summary={projectdata?.analysis.find((item) => item.type === currentanalysis)?.summary} />
          </div>}

        </div>

        <div className='m-4 xss:w-84 md:w-116 lg:w-lg'>
          <div className='bg-light-surface dark:bg-dark-surface flex  xss:text-[9px]  md:text-sm border border-b-0 rounded-t-md border-light-border dark:border-dark-border'>
            {Analysis.map((item, index) => {
              return <div key={index} className={`font-bold border transition-all duration-300 cursor-pointer hover:bg-light-accent/5 hover:dark:bg-dark-surface-hover/30  ${currentanalysis === item ? 'text-light-text-primary dark:text-dark-text-on-hover' : 'text-light-text-muted dark:text-dark-text-muted'} border-light-border dark:border-dark-border w-[35%] text-center p-5 ${item === "Architecture" ? 'border-y-0 border-l-0' : item === "Performance" ? 'border-y-0 border-r-0' : 'border-0'}`} onClick={() => setcurrentanalysis(item)}>{item}</div>
            })}
          </div>
          <Activity mode={currentanalysis === "Architecture" ? 'visible' : 'hidden'}>
            <AnalysisCard type='Architecture' refetch={refetch} analysis={projectdata?.analysis.find(item => item.type === "Architecture")} />
          </Activity>
          <Activity mode={currentanalysis === "Performance" ? 'visible' : 'hidden'}>
            <AnalysisCard type='Performance' refetch={refetch} analysis={projectdata?.analysis.find(item => item.type === "Performance")} />
          </Activity>
          <Activity mode={currentanalysis === "Security" ? 'visible' : 'hidden'}>
            <AnalysisCard type='Security' refetch={refetch} analysis={projectdata?.analysis.find(item => item.type === "Security")} />
          </Activity>
        </div>
      </div>
    </div>
  )
}

export default AnalysisContent
