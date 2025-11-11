"use client"
import Button from '@/ui/Buttons/Button'
import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import { GitBranch, Shield, Zap } from 'lucide-react'
import OverallCard from './OverallCard'
import Architecture from './Architecture'
import { Activity, useState } from 'react'
import Security from './Security'
import Performance from './Performance'


function AnalysisContent() {
  const [currentanalysis, setcurrentanalysis] = useState<"Architecture" | "Security" | "Performance">("Architecture");

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

  return (
    <div className='h-screen bg-light-gray/50 dark:bg-dark-black overflow-auto flex flex-col items-center'>
      <div className='p-5 border w-full bg-light-white dark:bg-dark-gray flex justify-between items-center border-light-activeborder/20 border-t-0 border-x-0'>
        <div>
          <SecondTitle>Ecommerce Application</SecondTitle>
          <div className='flex gap-2'>
            <SmallText textcolor='text-light-black/80 dark:text-dark-white/80'>47 files •</SmallText>
            <SmallText textcolor='text-light-black/80 dark:text-dark-white/80'>Last Analysed 2 hours ago</SmallText>
          </div>
        </div>
        <div>
          <Button variant='purple'>Re-analyze</Button>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <OverallCard />
      </div>
      <div className='border m-5 dark:bg-dark-gray xss:w-[440px] md:w-xl xl:w-4xl border-light-activeborder/20 rounded-md'>
        <div className='py-4 border border-x-0 border-t-0 border-light-activeborder/20 flex xss:gap-4 md:gap-8 xl:gap-25 xss:text-sm md:text-base justify-center'>
          {Analysis.map((item) => {
            return <button key={item.type} onClick={() => setcurrentanalysis(item.type)} className={`flex ${item.type === currentanalysis && item.active} ${item.hover} gap-1 items-center cursor-pointer p-2 rounded-md`}>{item.icon} {item.type}</button>
          })}
        </div>
        <Activity mode={currentanalysis === "Architecture" ? 'visible' : 'hidden'}>
          <Architecture />
        </Activity>
        <Activity mode={currentanalysis === "Security" ? 'visible' : 'hidden'}>
          <Security />
        </Activity>
        <Activity mode={currentanalysis === "Performance" ? 'visible' : 'hidden'}>
          <Performance />
        </Activity>
      </div>
    </div>
  )
}

export default AnalysisContent
