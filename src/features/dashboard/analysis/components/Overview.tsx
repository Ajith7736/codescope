import React from 'react'

function Overview({ summary }: { summary: string | null | undefined}) {
    return (
        <div className='bg-indigo-600/10  border flex flex-col gap-3 xss:w-[80vw] md:w-[50vw] xl:w-[30vw] mt-5 mb-5 rounded-[7px] p-2 border-indigo-600/20'>
            <p className='text-xs font-extrabold text-indigo-600'>AI OVERVIEW</p>
            {summary ? <p className='text-[10px] text-light-text-muted dark:text-dark-text-primary italic'>{summary}</p> : <p className='text-[10px] text-dark-text-primary italic'>Click the analysis to get overview of the code</p>}
        </div>
    )
}

export default Overview
