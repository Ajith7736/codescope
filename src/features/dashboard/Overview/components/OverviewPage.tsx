"use client"
import useFetch from '@/hooks/useFetch'
import { useSession } from '@/lib/auth-client'
import { Overview, Project } from '@/types/type'
import Button from '@/ui/Buttons/Button'
import ButtonLoader from '@/ui/loaders/ButtonLoader'
import { BookOpen, GitBranch, Layers, Lightbulb, Rocket, SparklesIcon, Workflow, Zap } from 'lucide-react'
import ListContent from './ListContent'
import BasicLoader from '@/ui/loaders/BasicLoader'

function OverviewPage({ overview, refetch, projectdata, isRefetching }: { refetch: Function, isRefetching: Boolean, projectdata: Pick<Project, "id" | "projectcode" | "projecttree"> | null, overview: Overview | null | undefined }) {
  const { data: session } = useSession();
  const { loading, fetchdata: fetchoverview } = useFetch("/api/overview", "POST", { projectId: projectdata?.id, projectcode: projectdata?.projectcode, projecttree: projectdata?.projecttree, userId: session?.user?.id }, refetch)


  return (
    <div className='flex items-start justify-start xss:w-full md:max-w-3xl lg:max-w-5xl p-3'>
      <div className='dark:bg-dark-surface border rounded-md border-light-border dark:border-dark-border w-full'>
        <div className='p-3 border-b border-light-border dark:border-dark-border flex justify-between'>
          <h1 className='text-xs flex gap-2 items-center text-indigo-500 font-extrabold'><SparklesIcon className='size-4' />AI Explain</h1>
          {loading || isRefetching ? <Button variant='blue' className='w-30 h-10'><ButtonLoader variant='white'/>Overview</Button> : <Button className='w-30 h-10' onClick={fetchoverview} variant='blue'>Overview</Button>}
        </div>

        {loading || isRefetching ? <div className='p-5 flex flex-col text-xs items-center justify-center text-dark-text-muted italic'><BasicLoader /> This may take few seconds.</div> : overview ? <>
          <div className='p-6 flex flex-col gap-6'>
            <div className='bg-indigo-600/10 p-4 flex flex-col gap-2 rounded-md border border-light-border dark:border-dark-border'>
              <h1 className='text-xs font-extrabold text-indigo-500'>SUMMARY</h1>
              <p className='text-[10px]'>{overview.summary}</p>
            </div>

            {/* Key Features */}

            <ListContent list={overview.keyFeatures} variant='amber' icon={<Zap className='size-4 text-amber-400' />} title='Key Features' />

            {/* Tech Stack */}

            <div className='flex flex-col gap-3'>
              <h1 className='text-[13px] flex gap-2 items-center font-extrabold'><Layers className='text-indigo-600 size-4' />Tech Stack</h1>
              <div className='flex gap-3 flex-wrap'>
                {overview?.techStack?.map((item, index) => {
                  return <div key={index} className='text-[10px] bg-indigo-600/20 p-1 rounded-md w-fit border border-dark-accent/50 text-indigo-500'>{item}</div>
                })}
              </div>
            </div>

            {/* Use cases */}

            <ListContent list={overview?.useCases} variant='emerald' icon={<BookOpen className='size-4 text-emerald-500' />} title='Use Cases' />

            {/* Architecture */}

            <ListContent list={overview?.architecture} variant='blue' icon={<GitBranch className='size-4 text-blue-500' />} title='Architecture' />

            {/* How it works */}

            <ListContent list={overview?.howItWorks} variant='amber' icon={<Workflow className='size-4 text-lime-500' />} title='How it works' />

            {/* Getting Started */}

            <ListContent list={overview?.gettingStarted} variant='amber' icon={<Rocket className='size-4 text-teal-500' />} title='Getting Started' />



            {/* Notable Features */}

            <ListContent list={overview?.notableFeatures} variant='amber' icon={<Lightbulb className='size-4 text-rose-500' />} title='Notable Features' />




          </div>
        </> : <div className='text-xs p-5'>No overview</div>
        } {/* Summary */}


      </div>
    </div >
  )
}

export default OverviewPage
