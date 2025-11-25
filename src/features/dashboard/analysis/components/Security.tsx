import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import IssueCard from './IssueCard'
import { Analysis } from '@/types/type'
import Button from '@/ui/Buttons/Button'
import { useProject } from '@/context/ProjectProvider'
import useFetch from '@/hooks/useFetch'
import ButtonLoader from '@/ui/loaders/ButtonLoader'

function Security({ analysis, refetch }: { analysis: Analysis | undefined, refetch: () => void }) {

    const { projectdata } = useProject();

    // first analysis fetch call

    const {
        loading,
        fetchdata: handleanalysis
    } = useFetch(
        "/api/analysis",
        "POST",
        {
            project: projectdata,
            analysistype: "Security"
        },refetch
    )

    // re analysis

    const { data: resdata, loading: reanalysisloading, fetchdata: handlereanalysis } = useFetch(
        "/api/reanalysis",
        "PUT",
        {
            project: projectdata,
            analysisId: analysis?.id,
            analysistype: "Security"
        }, refetch
    )


    if (!analysis) return (<>
        <div className='p-3 flex justify-between items-center bg-dark-hovergray border border-x-0 border-t-0 border-light-activeborder/20'>
            <p className='text-xs text-light-activeborder'>Analyse architecture!</p>
            {loading ? <Button variant="blue"><ButtonLoader /></Button> : <Button variant='blue' onClick={handleanalysis}>Analyse</Button>}
        </div>
        <div className='p-10 text-xs'>No Issues</div>
    </>)

    return (
        <>
            <div className='p-3 flex justify-between items-center bg-dark-hovergray border border-x-0 border-t-0 border-light-activeborder/20'>
                <p className='text-xs text-light-activeborder'>Analyse Security!</p>
                {reanalysisloading ? <Button variant="blue"><ButtonLoader /></Button> : <Button variant='blue' onClick={handlereanalysis}>Re-Analyse</Button>}
            </div>
            <div className='flex flex-col gap-2'>
                <div className='p-5 flex justify-between items-center'>
                    <div>
                        <SecondTitle>Security Analysis</SecondTitle>
                        <SmallText textcolor='text-black/60 dark:text-light-white/60'>{analysis.totalissues} issues found</SmallText>
                    </div>
                    <div>
                        <h1 className='text-xl md:text-2xl font-extrabold text-red-500'>{analysis.score}/100</h1>
                    </div>
                </div>
                <div className='p-5 flex flex-col gap-3'>
                    <div className='font-bold text-sm'>issues found</div>
                    <IssueCard issues={analysis.issues} />
                </div>
            </div>
        </>
    )
}

export default Security
