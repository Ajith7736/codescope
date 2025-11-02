import { PanelLeft } from 'lucide-react'


function Nav({ handlesidebar }: { handlesidebar: () => void }) {
    return (
        <div className='flex items-center gap-5'>
            <PanelLeft onClick={handlesidebar} className='size-5 cursor-pointer' />
            <div className='text-xs '>Dashboard </div>
        </div>
    )
}

export default Nav