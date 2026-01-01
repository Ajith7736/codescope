"use client"
import { DashCardProps, Project, recentanalysis } from '@/types/type'
import Button from '@/ui/Buttons/Button'
import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import { AlertCircle, File, Folder, Plus, TriangleAlert } from 'lucide-react'
import RecentProject from './RecentProject'
import Card from './Card'
import { redirect } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useSession } from '@/lib/auth-client'
import { toast } from 'sonner'
import RecentAnalysis from './RecentAnalysis'
import Loading from '@/app/loading'



function DashContent() {
  const [projects, setprojects] = useState<Project[]>([])
  const [recentanalysis, setrecentanalysis] = useState<recentanalysis[]>([])
  const { data: session } = useSession();
  const [total, settotal] = useState({
    totalprojects: 0,
    totalanalysis: 0,
    totalissues: 0,
    criticalissues: 0
  })

  useEffect(() => {
      localStorage.removeItem("auth-loading")
  }, [])




  const { data, isLoading } = useQuery({
    queryKey: ["RecentProject"],
    queryFn: async () => {
      const res = await fetch("/api/fetch-recent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: session?.user?.id })
      })

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message)
        throw new Error(data.message)
      }

      return data;
    },
    enabled: !!session?.user?.id,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (data && data.success) {
      setprojects(data.projects)
      setrecentanalysis(data.analysis)
      settotal({ totalanalysis: data.total_analysis, totalissues: data.total_issues, totalprojects: data.total_projects, criticalissues: data.critical_issues })
    }
  }, [data])


  console.log(session);

  const card: DashCardProps[] = [
    {
      icon: <Folder />,
      number: total.totalprojects || 0,
      title: "Total Projects",
      style: "bg-purple-500/30 text-purple-600"
    },
    {

      icon: <File />,
      number: total.totalanalysis || 0,
      title: "Files Analyzed",
      style: "bg-blue-500/30 text-blue-600"
    },
    {
      icon: <TriangleAlert />,
      number: total.totalissues || 0,
      title: "Issues Found",
      style: "bg-orange-500/30 text-orange-600"
    },
    {
      icon: <AlertCircle />,
      number: total.criticalissues || 0,
      title: "Critical Issues",
      style: "bg-red-500/30 text-red-600"
    }
  ]

  if (isLoading) return <Loading />


  return (
    <div className='flex flex-col outline-none bg-light-background dark:bg-dark-background h-dvh overflow-auto transition-all duration-300'>
      <div className='bg-light-white border border-light-border dark:border-dark-border border-t-0 border-x-0 bg-light-surface dark:bg-dark-surface p-5 flex justify-between items-center'>
        <div className='lg:w-[80%] xss:w-[40vw]'>
          <SecondTitle>Dashboard</SecondTitle>
          <SmallText className='text-dark-text-muted'>Welcome Back! Here's your code analysis overview.</SmallText>
        </div>
        <div>
          <Button variant='blue' onClick={() => redirect("/Dashboard/Projects")} icons={<Plus className='size-4' />} className='shadow-xl shadow-indigo-600/20'>New Project</Button>
        </div>
      </div>
      <div className='p-5 flex flex-col md:flex-row md:flex-wrap md:justify-center gap-5 items-center'>
        {card.map((item, index) => {
          return <Card item={item} key={index} />
        })}
      </div>


      <div className='flex flex-col gap-5 mx-8 mb-10 items-center md:flex-row md:flex-wrap md:items-center md:justify-center'>

        {/* Recent Projects */}

        <RecentProject projects={projects} isLoading={isLoading} />

        {/* Recent Analysis */}

        <RecentAnalysis analysis={recentanalysis} isLoading={isLoading} />


      </div>
    </div>
  )
}

export default DashContent
