import { DashCardProps } from '@/types/type'
import Button from '@/ui/Buttons/Button'
import ActionText from '@/ui/Text/ActionText'
import IssuesText from '@/ui/Text/IssuesText'
import ProjectText from '@/ui/Text/ProjectText'
import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import StatusText from '@/ui/Text/StatusText'
import { CircleCheckBig, Code, File, Folder, Github, Plus, Shield, TriangleAlert, Upload } from 'lucide-react'
import React from 'react'
import RecentProject from './RecentProject'
import Card from './Card'
import RecentAnalysis from './RecentAnalysis'

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
      number: "1,245",
      title: "Files Analyzed",
      style: "bg-orange-500/30 text-orange-600"
    },
    {
      icon: <CircleCheckBig />,
      number: "1,245",
      title: "Files Analyzed",
      style: "bg-green-500/30 text-green-600"
    },
  ]

  return (
    <div className='flex flex-col overflow-auto transition-all duration-300'>
      <div className='bg-light-white dark:bg-dark-gray p-5 flex justify-between items-center'>
        <div className='lg:w-full xss:w-[40vw]'>
          <SecondTitle>Dashboard</SecondTitle>
          <SmallText>Welcome Back! Here's your code analysis overview.</SmallText>
        </div>
        <div>
          <Button icons={<Plus className='size-4' />}>New Project</Button>
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
