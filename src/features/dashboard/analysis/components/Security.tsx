import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'
import IssueCard from './IssueCard'

function Security() {
    return (
        <div className='flex flex-col gap-2'>
            <div className='p-5 flex justify-between items-center'>
                <div>
                    <SecondTitle>Security Analysis</SecondTitle>
                    <SmallText textcolor='text-black/60'>3 issues found</SmallText>
                </div>
                <div>
                    <h1 className='text-xl md:text-2xl font-extrabold text-red-500'>78/100</h1>
                </div>
            </div>
            <div className='p-5 flex flex-col gap-3'>
                <div className='font-bold text-sm'>issues found</div>
                <IssueCard />
            </div>
        </div>
    )
}

export default Security
