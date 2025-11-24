import { Issues } from '@/types/type'
import Syntax from '@/ui/SyntaxHighlighter/Syntax'
import RiskText from '@/ui/Text/RiskText'
import { CircleCheckBig } from 'lucide-react'

function IssueCard({ issues }: { issues: Issues[] }) {
    return (
        <>
        {issues?.map((issue) => {
            return <div key={issue.id} className='bg-red-400/30 dark:bg-red-500/30 border-4 p-5 border-y-0 border-r-0 border-pink-400 dark:border-red-500 w-full flex flex-col gap-3'>
                <RiskText variant={issue.severity}>{issue.severity}</RiskText>
                <h1 className='font-extrabold md:text-lg xss:text-base'>{issue.issuetitle}</h1>
                <p className='text-light-black/80 dark:text-white/80 lg:text-sm xss:text-xs'>{issue.issuedesc}</p>
                <p className='text-light-black/80 dark:text-white/80 text-xs'>{issue.issuelocation}</p>
                <div className='bg-light-white dark:bg-dark-hovergray p-5 flex flex-col gap-2 rounded-md border border-light-activeborder/20'>
                    <p className='text-xs flex gap-2 '><CircleCheckBig size={13} className='text-green-500' />Suggessted Fix</p>
                    <div className='bg-light-gray dark:bg-dark-inputborder p-5   overflow-hidden overflow-x-auto border border-light-activeborder/20'>
                        <pre className='text-light-black/80 text-wrap dark:text-light-activeborder lg:text-sm xss:text-xs'>{issue.suggesstedfix}</pre>
                        {issue.suggesstedcode && <Syntax language={issue.suggesstedcodelanguage} code={issue.suggesstedcode} /> }
                    </div>
                </div>
            </div>
        })}
        </>
    )
}

export default IssueCard
