import React, { Activity, useState } from 'react'
import AnalysisCard from './Analysis'
import RepoDetail from './RepoDetail'
import OverallCard from './OverallCard'
import MetaData from './MetaData'
import { Project } from '@/types/type'
import Overview from './Overview'

function AnalysisPage({ projectdata, refetch }: { projectdata: Project | null, refetch: Function }) {
  
  const [currentanalysis, setcurrentanalysis] = useState<"Architecture" | "Security" | "Performance" | "Overview">("Architecture");
  const Analysis: ("Architecture" | "Security" | "Performance")[] = ["Architecture", "Security", "Performance"]

  return (
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

      <div className='flex flex-col w-full items-center'>
        <div className='m-4 xss:w-84 md:w-[460px] lg:w-lg'>
          <div className='bg-light-surface dark:bg-dark-surface flex  xss:text-[9px]  md:text-xs border border-b-0 rounded-t-md border-light-border dark:border-dark-border'>
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
          <Activity mode={currentanalysis === "Overview" ? 'visible' : 'hidden'}>
            <RepoDetail projectcode={projectdata?.projectcode} projectId={projectdata?.id} projecttree={projectdata?.projecttree} />
          </Activity>
        </div>
      </div>
    </div>
  )
}

export default AnalysisPage
