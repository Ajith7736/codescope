import React, { useState } from 'react'
import SampleCode from './SampleCode'
import { showcodeprops } from '@/types/type'
import SampleAnalysis from './SampleAnalysis'

function Sample() {

    const [showcode, setshowcode] = useState<showcodeprops>({
        id: null,
        show: false
    })

    return (
        <div className='flex flex-col lg:gap-5'>
            <div className="flex flex-col gap-2">
                <h1 className="text-center font-extrabold xss:text-2xl md:text-4xl">Analyze your Code</h1>
                <p className="xss:text-[10px] md:text-xs px-10 text-gray-500 text-center">Analyze your whole codebase and find issues that are missed</p>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-3 items-center lg:items-baseline justify-between">
                <SampleCode />
                <SampleAnalysis showcode={showcode} setshowcode={setshowcode} />
            </div>
        </div>
    )
}

export default Sample