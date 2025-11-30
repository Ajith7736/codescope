
import { Analysis } from '@/types/type'
import Button from '@/ui/Buttons/Button'
import ButtonLoader from '@/ui/loaders/ButtonLoader'
import useFetch from '@/hooks/useFetch'
import { useProject } from '@/context/ProjectProvider'
import { ChevronDown, CircleCheckBig, Play, RefreshCcw } from 'lucide-react'
import Syntax from '@/ui/SyntaxHighlighter/Syntax'
import { AnimatePresence, motion } from "framer-motion"
import { useState } from 'react'
import RiskText from '@/ui/Text/RiskText'
import StatusIcon from '@/ui/icon/StatusIcon'
import { cn } from '@/lib/utils'
import Number from '@/ui/Number/Number'
import AnalysisLoader from '@/ui/loaders/AnalysisLoader'



function AnalysisCard({ analysis, refetch, type }: { analysis: Analysis | undefined, refetch: () => void, type: "Architecture" | "Security" | "Performance" }) {

    const { projectdata } = useProject();
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
            analysistype: type
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
            analysistype: type
        }, refetch
    )

    if (reanalysisloading || loading) {
        return <div className={`bg-light-surface dark:bg-dark-surface flex flex-col  gap-3 rounded-[3px] border border-light-border dark:border-dark-border xss:w-[90vw] md:w-[50vw] xl:w-[42vw] transition-all duration-300`}>
            <div className='flex justify-between items-center p-5 border-b border-light-border dark:border-dark-border'>
                <h1 className='text-sm font-extrabold'>{type} Analysis</h1>
                {loading && <Button variant='blue'><ButtonLoader />Analyzing</Button>}
                {reanalysisloading && <Button variant='blue'><RefreshCcw size={15} className='animate-spin' />Analyzing</Button>}
            </div>
            <div className='p-5 flex flex-col gap-3 items-center justify-center'>
                <AnalysisLoader type={type} />
                <div className='text-xs font-extrabold'>Analyzing {type}...</div>
                <div className='text-[9px] text-dark-text-muted italic'>Gemini is scanning for {type}.</div>
            </div>
        </div>
    }

    if (!analysis) return <div className={`bg-light-border dark:bg-dark-surface flex flex-col rounded-[3px] border border-dark-border xss:w-[90vw] md:w-[50vw] xl:w-[42vw] transition-all duration-300`}>
        <div className='flex justify-between items-center p-5 border-b border-dark-border'>
            <h1 className='text-sm font-extrabold'>{type} Analysis</h1>
            {loading ? <Button variant='blue'><ButtonLoader />Analyzing</Button> : <Button variant='blue' onClick={handleanalysis}><Play size={14} />Analyse</Button>}
        </div>
        <div className='p-5'>
            <h1 className='text-[12px] italic text-dark-text-muted'>No Issues</h1>
        </div>
    </div>

    const getcolor = (s: number) => {
        if (s >= 80) return '#10b981';
        if (s >= 50) return '#f59e0b';
        return '#ef4444';
    }


    return (
        <>
            <div className={`bg-light-surface dark:bg-dark-surface flex flex-col rounded-[3px] border border-light-border dark:border-dark-border xss:w-[90vw] md:w-[50vw] xl:w-[42vw] transition-all duration-300`}>
                <div className='flex justify-between p-5 border border-t-0 border-x-0 border-light-border dark:border-dark-border items-center'>
                    <h1 className='xss:text-[13px] md:text-sm font-extrabold'>{type} Analysis</h1>
                    {reanalysisloading ? <Button variant='blue'><RefreshCcw size={15} className='animate-spin' />Analyzing</Button> : <Button variant='blue' onClick={handlereanalysis} ><RefreshCcw size={15} />Re-Analyse</Button>}
                </div>
                <div className='flex flex-col gap-1 p-5'>
                    <h1 className='text-sm flex gap-2'>Score : <span className='font-extrabold' style={{ color: getcolor(analysis.score) }}><Number n={analysis.score} /></span></h1>
                </div>
                <div className='p-5 flex flex-col gap-3'>
                    <h1 className='text-xs italic'>Issues Detected</h1>
                    {analysis.issues.map((issue) => {
                        return <motion.div key={issue.id} transition={{ duration: 1, ease: "easeInOut" }} className='bg-light-accent/5 dark:bg-indigo-500/5 border overflow-hidden relative border-light-border dark:border-dark-border flex  flex-col hover:border-light-accent/30 hover:dark:border-dark-accent/30  rounded-[9px] '>
                            <div className={cn(`h-full w-[3px] absolute left-0 top-0 rounded-l-2xl ${issue.severity === "low" ? 'bg-blue-500' : issue.severity === "medium" ? 'bg-orange-500' : 'bg-red-500'}`)}></div>
                            <div onClick={() => setshowcode({ show: issue.id === showcode.id ? !showcode.show : true, id: issue.id })} className='flex justify-between p-5 select-none cursor-pointer'>
                                <div className='flex gap-2 md:gap-3 items-center'>
                                    <StatusIcon type={type} variant={issue.severity} />
                                    <div className='xss:text-[9px] md:text-[11px]'>{issue.issuetitle}</div>
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
                                        {issue.suggesstedcode && issue.suggesstedcode !== "N/A" && <div className='bg-light-accent/10 dark:bg-dark-surface p-4 rounded-[3px] border border-light-border dark:border-dark-accent/40 '>
                                            <p className='xss:text-[10px] lg:text-xs flex gap-2 items-center'><CircleCheckBig className='text-emerald-500 xss:size-3 lg:size-4 ' />Suggested fix</p>
                                            <Syntax code={issue.suggesstedcode!} language={issue.suggesstedcodelanguage} />
                                        </div>}
                                    </div>
                                </motion.div>}
                            </AnimatePresence>
                        </motion.div>
                    })}
                </div>
            </div>
        </>

    )
}

export default AnalysisCard;
