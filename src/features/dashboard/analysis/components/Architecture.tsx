import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import IssueCard from './IssueCard'
import { Analysis } from '@/types/type'
import Button from '@/ui/Buttons/Button'
import ButtonLoader from '@/ui/loaders/ButtonLoader'
import useFetch from '@/hooks/useFetch'
import { useProject } from '@/context/ProjectProvider'
import { useSidebar } from '@/context/SidebarProvider'
import { CheckCircle, ChevronDown, CircleCheckBig, RefreshCcw, Shield } from 'lucide-react'
import Syntax from '@/ui/SyntaxHighlighter/Syntax'



function Architecture({ analysis, refetch, }: { analysis: Analysis | undefined, refetch: () => void }) {

    const { projectdata } = useProject();
    const { showsidebar } = useSidebar();



    // first analysis fetch call

    const {
        loading,
        fetchdata: handleanalysis
    } = useFetch(
        "/api/analysis",
        "POST",
        {
            project: projectdata,
            analysistype: "Architecture"
        },
        refetch
    )



    // re analysis

    const { loading: reanalysisloading, fetchdata: handlereanalysis } = useFetch(
        "/api/reanalysis",
        "PUT",
        {
            project: projectdata,
            analysisId: analysis?.id,
            analysistype: "Architecture"
        }, refetch
    )



    return (
        <>
            <div className={`bg-dark-surface m-5 p-5 flex flex-col gap-3 rounded-[3px] border border-dark-border xss:w-[90vw] md:w-[50vw] xl:w-[42vw] transition-all duration-300`}>
                <div className='flex justify-between items-center'>
                    <h1 className=''>Architecture Analysis</h1>
                    <Button variant='blue'><RefreshCcw size={15}/>Re-Analyse</Button>
                </div>
                <div>
                    <h1 className='text-xs'>Issues Detected</h1>
                </div>
                <div className='bg-indigo-500/5 border relative p-5 border-dark-border flex  flex-col gap-4 hover:border-dark-accent/30 cursor-pointer  rounded-[9px] '>
                  <div className='h-full w-[3px] absolute left-0 top-0 rounded-l-2xl bg-red-500'></div>
                   <div className='flex justify-between'>
                    <div className='flex gap-3 items-center'>
                         <div className='bg-red-500/10 border border-red-500/30  text-red-500 w-8 flex justify-center items-center h-8 rounded-md'><Shield size={20} /></div>
                        <div className='xss:text-xs'>Cross-Site Scripting (XSS)</div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='text-xs text-red-500 p-1 bg-red-500/10 border border-red-500/30'>critical</div>
                        <ChevronDown size={17}/>
                    </div>
                    </div> 
                    
                    <div className='flex flex-col gap-3'>
                        <p className=' text-dark-text-muted text-xs'>The `filter` operation inside the `App` component's render function is an 'expensive'</p>
                        <p className='text-[10px] lg:text-[11px]'>userService.ts</p>
                        <div className='bg-dark-input-bg p-4 rounded-[3px] border border-dark-accent/40 '>
                            <p className='xss:text-[10px] lg:text-xs flex gap-2 items-center'><CircleCheckBig className='text-emerald-500 xss:size-3 lg:size-4 '/>Suggested fix</p>
                            <Syntax code='<html>Hello world</html>' language='html'/>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Architecture
