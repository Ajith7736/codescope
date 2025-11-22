import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import IssueCard from './IssueCard'
import { Analysis } from '@/types/type'
import Button from '@/ui/Buttons/Button'
import ButtonLoader from '@/ui/loaders/ButtonLoader'


function Architecture({ analysis, callback, isloading }: { analysis: Analysis[] | undefined, callback: () => void, isloading: boolean }) {

    if (!analysis) return <div className='p-5'>No Data</div>
    if (analysis.length === 0) return (<>
        <div className='p-3 flex justify-between items-center bg-dark-hovergray border border-x-0 border-t-0 border-light-activeborder/20'>
            <p className='text-xs text-light-activeborder'>Analyse architecture!</p>
            {isloading ? <Button variant="purple"><ButtonLoader /></Button> : <Button variant='purple' onClick={callback}>Analyse</Button>}
        </div>
        <div className='p-10 text-xs'>No Issues</div>
    </>)

    return (
        <>
            <div className='p-3 flex justify-between items-center bg-dark-hovergray border border-x-0 border-t-0 border-light-activeborder/20'>
                <p className='text-xs text-light-activeborder'>Click here to analyse architecture!</p>
                <Button variant='purple'>Analyse</Button>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='p-5 flex justify-between items-center'>
                    <div>
                        <SecondTitle>Architecture Analysis</SecondTitle>
                        <SmallText textcolor='text-black/60 dark:text-light-white/60'>3 issues found</SmallText>
                    </div>
                    <div>
                        <h1 className='text-xl md:text-2xl font-extrabold text-blue-500'>78/100</h1>
                    </div>
                </div>
                <div className='p-5 flex flex-col gap-3'>
                    <div className='font-bold text-sm'>issues found</div>
                    <IssueCard />
                </div>
            </div>
        </>

    )
}

export default Architecture
