import { usePage } from '@/context/PageProvider'
import { PanelLeft } from 'lucide-react'


function Nav({ handlesidebar }: { handlesidebar: () => void }) {
    const { currentpage } = usePage();
    return (
        <div className='flex items-center gap-3'>
            <button><PanelLeft onClick={handlesidebar} className='size-5 cursor-pointer' /></button>
            <div className='xss:text-xs md:text-sm capitalize'>{currentpage}</div>
        </div>
    )
}

export default Nav