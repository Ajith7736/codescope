"use client"
import { DashCardProps } from '@/types/type'
import Button from '@/ui/Buttons/Button'
import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import { CircleCheckBig, File, Folder, Plus, TriangleAlert } from 'lucide-react'
import RecentProject from './RecentProject'
import Card from './Card'
import RecentAnalysis from './RecentAnalysis'
import { usePage } from '@/context/PageProvider'
import { redirect } from 'next/navigation'

function DashContent() {
  const card: DashCardProps[] = [
    {
      icon: <Folder />,
      number: "24",
      title: "Total Projects",
      style: "bg-purple-500/30 text-purple-600"
    },
    {
      icon: <File />,
      number: "1,245",
      title: "Files Analyzed",
      style: "bg-blue-500/30 text-blue-600"
    },
    {
      icon: <TriangleAlert />,
      number: "42",
      title: "Issues Found",
      style: "bg-orange-500/30 text-orange-600"
    },
    {
      icon: <CircleCheckBig />,
      number: "1,203",
      title: "Issues Resolved",
      style: "bg-green-500/30 text-green-600"
    },]

  return (
    <div className='flex flex-col outline-none bg-light-gray/40 dark:bg-dark-black h-screen overflow-auto transition-all duration-300'>
      <div className='bg-light-white border border-light-activeborder/20 border-t-0 border-x-0 dark:bg-dark-gray p-5 flex justify-between items-center'>
        <div className='lg:w-full xss:w-[40vw]'>
          <SecondTitle>Dashboard</SecondTitle>
          <SmallText>Welcome Back! Here's your code analysis overview.</SmallText>
        </div>
        <div>
          <Button onClick={() => redirect("/Dashboard/Projects")} icons={<Plus className='size-4' />}>New Project</Button>
        </div>
      </div>
      <div className='p-5 flex flex-col md:flex-row md:flex-wrap md:justify-center gap-5 items-center'>
        {card.map((item, index) => {
          return <Card item={item} key={index} />
        })}
      </div>


      <div className='flex flex-col gap-5 mx-8 mb-10 md:flex-row md:flex-wrap md:items-center md:justify-center'>

        {/* Recent Projects */}

        <RecentProject />

        {/* Recent Analysis */}

        <RecentAnalysis />

      </div>
    </div>
  )
}

export default DashContent
