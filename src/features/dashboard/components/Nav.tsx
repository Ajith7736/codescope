import { ArrowRightCircleIcon, PanelLeft } from 'lucide-react'
import React, { FunctionComponent } from 'react'

function Nav({ handlesidebar }: { handlesidebar: () => void }) {
    return (
        <div className='flex items-center gap-5'>
            <PanelLeft onClick={handlesidebar} className='size-5' />
            <div className='text-xs '>Dashboard </div>
        </div>
    )
}

export default Nav