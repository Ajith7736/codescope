"use client"

import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import { GitBranch, Shield, Zap } from 'lucide-react'
import OverallCard from './OverallCard'
import Architecture from './Architecture'
import { Activity, useEffect, useState } from 'react'
import Security from './Security'
import Performance from './Performance'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Project } from '@/types/type'
import Loading from '@/app/loading'
import useFetch from '@/hooks/useFetch'
import Button from '@/ui/Buttons/Button'
import ButtonLoader from '@/ui/loaders/ButtonLoader'


function AnalysisContent({ id }: { id: string }) {
  const [currentanalysis, setcurrentanalysis] = useState<"Architecture" | "Security" | "Performance">("Architecture");
  const [projectdata, setprojectdata] = useState<Project | null>(null)


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



  interface Analysiscontentprops {
    icon: React.ReactElement,
    hover: string,
    active: string,
    type: "Architecture" | "Security" | "Performance"
  }

  const Analysis: Analysiscontentprops[] = [
    {
      icon: <GitBranch className='size-4' />,
      hover: "hover:bg-blue-500/10 text-blue-600",
      active: "bg-blue-500/10 text-blue-600",
      type: "Architecture"
    },
    {
      icon: <Shield className='size-4' />,
      hover: "hover:bg-pink-500/10 text-pink-600",
      active: "bg-pink-500/10 text-pink-600",
      type: "Security"
    }, {
      icon: <Zap className='size-4' />,
      hover: "hover:bg-green-500/10 text-green-600",
      active: "bg-green-500/10 text-green-600",
      type: "Performance"
    }
  ]

  const { data: resdata, loading, fetchdata: handleanalysis } = useFetch("/api/architecture-api", "POST", projectdata)


  const { data: successres, loading: updateloader, fetchdata: handleupdate } = useFetch("/api/update-repo", "PUT", { owner: projectdata?.ownername, repo: projectdata?.projectname, projectId: projectdata?.id })


  useEffect(() => {
    if (successres) {
      refetch();
    }
  }, [successres])


  useEffect(() => {
    if (resdata) {
      console.log(resdata.message)
    }
  }, [resdata])


  if (isLoading) return <Loading />

  return (
    <div className='h-screen bg-light-gray/50 dark:bg-dark-black overflow-auto flex flex-col items-center'>
      <div className='p-5 border w-full bg-light-white dark:bg-dark-gray flex justify-between items-center border-light-activeborder/20 border-t-0 border-x-0'>
        <div>
          <SecondTitle>{projectdata?.projectname}</SecondTitle>
          <div className='mt-1'>
            <SmallText textcolor='text-light-black/80 dark:text-dark-white/80' className='lg:text-xs'>{projectdata?.totalfiles} files </SmallText>
            <SmallText textcolor='text-light-black/80 dark:text-dark-white/80' className='lg:text-xs'>Last commit • {projectdata?.lastcommit}</SmallText>
          </div>
        </div>
        <div>
          {updateloader ? <Button variant='purple'><ButtonLoader variant='purple' /></Button> : <Button variant='purple' onClick={handleupdate}>Re-fetch</Button>}
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <OverallCard />
      </div>
      <div className='border m-5 dark:bg-dark-gray xss:w-[440px] md:w-md lg:w-xl xl:w-4xl border-light-activeborder/20 rounded-md'>
        <div className='py-4 border border-x-0 border-t-0 border-light-activeborder/20 flex xss:gap-4 md:gap-4 xl:gap-25 xss:text-sm lg:text-base justify-center'>
          {Analysis.map((item) => {
            return (<button
              key={item.type}
              onClick={() => setcurrentanalysis(item.type)}
              className={`flex ${item.type === currentanalysis && item.active} ${item.hover} gap-1 items-center cursor-pointer p-2 rounded-md`}>
              {item.icon} {item.type}
            </button>)
          })}
        </div>
        <Activity mode={currentanalysis === "Architecture" ? 'visible' : 'hidden'}>
          <Architecture callback={handleanalysis} analysis={projectdata?.anaylsis} isloading={loading} />
        </Activity>
        <Activity mode={currentanalysis === "Security" ? 'visible' : 'hidden'}>
          <Security callback={handleanalysis} isloading={loading} analysis={projectdata?.anaylsis} />
        </Activity>
        <Activity mode={currentanalysis === "Performance" ? 'visible' : 'hidden'}>
          <Performance analysis={projectdata?.anaylsis} />
        </Activity>
      </div>
    </div>
  )
}

export default AnalysisContent
