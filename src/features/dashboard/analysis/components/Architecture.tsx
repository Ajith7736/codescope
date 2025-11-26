import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import IssueCard from './IssueCard'
import { Analysis } from '@/types/type'
import Button from '@/ui/Buttons/Button'
import ButtonLoader from '@/ui/loaders/ButtonLoader'
import useFetch from '@/hooks/useFetch'
import { useProject } from '@/context/ProjectProvider'
import { useSidebar } from '@/context/SidebarProvider'
import { CheckCircle, ChevronDown, CircleCheckBig, Play, RefreshCcw, Shield } from 'lucide-react'
import Syntax from '@/ui/SyntaxHighlighter/Syntax'
import { AnimatePresence, motion } from "framer-motion"
import { useState } from 'react'
import RiskText from '@/ui/Text/RiskText'
import StatusIcon from '@/ui/icon/StatusIcon'
import { cn } from '@/lib/utils'
import Number from '@/ui/Number/Number'



function Architecture({ analysis, refetch, }: { analysis: Analysis | undefined, refetch: () => void }) {

    const { projectdata } = useProject();
    const { showsidebar } = useSidebar();
    const [showcode, setshowcode] = useState<{ show: boolean, id: string | null | undefined }>({
        show: false,
        id: null
    });



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

    if (!analysis) return <div className={`bg-dark-surface m-5 flex flex-col gap-3 rounded-[3px] border border-dark-border xss:w-[90vw] md:w-[50vw] xl:w-[42vw] transition-all duration-300`}>
        <div className='flex justify-between items-center p-5 border-b border-dark-border'>
            <h1 className=''>Architecture Analysis</h1>
            {loading ? <Button variant='blue'><ButtonLoader />Analyzing</Button> : <Button variant='blue' onClick={handleanalysis}><Play size={14} />Analyse</Button>}
        </div>
        <div className='p-5'>
            <h1 className='text-[12px]'>No Isuues</h1>
        </div>
    </div>

    const getcolor = (s: number) => {
        if (s >= 80) return '#10b981';
        if (s >= 50) return '#f59e0b';
        return '#ef4444';
    }


    return (
        <>
            <div className={`bg-dark-surface m-5 p-5 flex flex-col gap-3 rounded-[3px] border border-dark-border xss:w-[90vw] md:w-[50vw] xl:w-[42vw] transition-all duration-300`}>
                <div className='flex justify-between items-center'>
                    <h1 className=''>Architecture Analysis</h1>
                    {reanalysisloading ? <Button variant='blue'><RefreshCcw size={15} className='animate-spin' />Analyzing</Button> : <Button variant='blue' onClick={handlereanalysis}><RefreshCcw size={15} />Re-Analyse</Button>}
                </div>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-sm flex gap-2'>Score : <span className='font-extrabold' style={{ color: getcolor(analysis.score) }}><Number n={analysis.score} /></span></h1>
                    <h1 className='text-xs'>Issues Detected</h1>
                </div>
                {analysis.issues.map((issue) => {
                    return <motion.div key={issue.id} transition={{ duration: 1, ease: "easeInOut" }} className='bg-indigo-500/5 border  overflow-hidden relative border-dark-border flex  flex-col hover:border-dark-accent/30 cursor-pointer  rounded-[9px] '>
                        <div className={cn(`h-full w-[3px] absolute left-0 top-0 rounded-l-2xl ${issue.severity === "low" ? 'bg-blue-500' : issue.severity === "medium" ? 'bg-orange-500' : 'bg-red-500'}`)}></div>
                        <div onClick={() => setshowcode({ show: issue.id === showcode.id ? !showcode.show : true, id: issue.id })} className='flex justify-between p-5 select-none'>
                            <div className='flex gap-3 items-center'>
                                <StatusIcon type={"Architecture"} variant={issue.severity} />
                                <div className='xss:text-[11px] '>{issue.issuetitle}</div>
                            </div>
                            <div className='flex items-center xss:gap-1 md:gap-3'>
                                <RiskText variant={issue.severity}>{issue.severity}</RiskText>
                                <motion.div initial={{ rotate: 0 }} animate={showcode.show && showcode.id === issue?.id ? { rotate: 180 } : { rotate: 0 }}><ChevronDown size={17} /></motion.div>
                            </div>
                        </div>
                        <AnimatePresence>
                            {showcode.show && showcode.id === issue.id && <motion.div layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2, ease: 'easeInOut' }}>
                                <div className='pb-5 px-5 flex flex-col gap-3'>
                                    <p className=' text-dark-text-muted text-xs'>{issue.issuedesc}</p>
                                    <p className='text-[10px] lg:text-[11px]'>{issue.issuelocation}</p>
                                    {issue.suggesstedcode && issue.suggesstedcode !== "N/A" && <div className='bg-dark-input-bg p-4 rounded-[3px] border border-dark-accent/40 '>
                                        <p className='xss:text-[10px] lg:text-xs flex gap-2 items-center'><CircleCheckBig className='text-emerald-500 xss:size-3 lg:size-4 ' />Suggested fix</p>
                                        <Syntax code={issue.suggesstedcode!} language={issue.suggesstedcodelanguage} />
                                    </div>}
                                </div>
                            </motion.div>}
                        </AnimatePresence>
                    </motion.div>
                })}
            </div>
        </>

    )
}

export default Architecture
