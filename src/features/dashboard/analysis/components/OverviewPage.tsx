import useFetch from '@/hooks/useFetch'
import { useSession } from '@/lib/auth-client'
import { Project } from '@/types/type'
import Button from '@/ui/Buttons/Button'
import Dot from '@/ui/Dot'
import ButtonLoader from '@/ui/loaders/ButtonLoader'
import { BookOpen, Layers, SparklesIcon, Zap } from 'lucide-react'

function OverviewPage({ projectdata }: { projectdata: Project | null }) {
  const { data: session } = useSession();
  const { data: overviewdata, loading, fetchdata: fetchoverview } = useFetch("/api/overview", "POST", { projectId: projectdata?.id, projectcode: projectdata?.projectcode, projecttree: projectdata?.projecttree, userId: session?.user.id })
  return (
    <div className='flex items-start justify-start xss:w-full md:w-5xl p-5'>
      <div className='dark:bg-dark-surface border rounded-md dark:border-dark-border w-full'>
        <div className='p-3 border-b border-dark-border flex justify-between'>
          <h1 className='text-xs flex gap-2 items-center text-indigo-500 font-extrabold'><SparklesIcon className='size-4' />AI Explain</h1>
          {loading ? <Button variant='blue'><ButtonLoader /></Button> : <Button onClick={fetchoverview} variant='blue'>Overview</Button>}
      </div>

      {/* Summary */}

      <div className='p-6 flex flex-col gap-6'>
        <div className='bg-indigo-600/10 p-4 flex flex-col gap-2 rounded-md border border-dark-border'>
          <h1 className='text-xs font-extrabold text-indigo-500'>SUMMARY</h1>
          <p className='text-[10px]'>React is a JavaScript library for building user interfaces, making it painless to create interactive UIs with a declarative and component-based approach. It allows developers to design simple views for each application state and efficiently update components as data changes. React is highly adaptable, enabling development of new features without extensive rewrites and supporting both server-side rendering with Node and mobile applications with React Native.</p>
        </div>

        {/* Key Features */}

        <div className='flex flex-col gap-3'>
          <h1 className='text-xs flex gap-2 font-extrabold'><Zap className='size-4  text-amber-400' />Key Features</h1>
          <ul className='text-xs'>
            <li className='flex items-center gap-3'>
              <Dot />
              <h1>Declarative views for predictable and easy-to-debug code</h1>
            </li>
          </ul>
        </div>

        {/* Tech Stack */}

        <div className='flex flex-col gap-3'>
          <h1 className='text-xs flex gap-2 items-center font-extrabold'><Layers className='text-indigo-600 size-4' />Tech Stack</h1>
          <div className='flex gap-3'>
            <div className='text-[10px] bg-indigo-600/20 p-1 rounded-md w-fit border border-dark-accent/50 text-indigo-500'>Javascript</div>
            <div className='text-[10px] bg-indigo-600/20 p-1 rounded-md w-fit border border-dark-accent/50 text-indigo-500'>Javascript</div>
          </div>
        </div>

        {/* Use cases */}

        <div className='flex flex-col gap-3'>
          <h1 className='text-xs flex gap-2 items-center font-extrabold'><BookOpen className='text-emerald-500 size-4' />Use Cases</h1>
          <ul className='text-xs'>
            <li className='flex items-center gap-3'>
              <Dot variant='emerald' />
              <h1>Declarative views for predictable and easy-to-debug code</h1>
            </li>
          </ul>
        </div>


      </div>
    </div>
    </div >
  )
}

export default OverviewPage
