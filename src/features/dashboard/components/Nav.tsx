import { PanelLeft } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';


function Nav({ handlesidebar }: { handlesidebar: () => void }) {
    const pathname = usePathname();
    const formattedpath = pathname.split("/")

    return (
        <div className='flex items-center gap-3 mx-5 mt-5'>
            <button><PanelLeft onClick={handlesidebar} className='size-5 cursor-pointer' /></button>
            <div className='flex gap-2'>
                <Link href={"/Dashboard"} className='xss:text-xs  capitalize '>&gt; Dashboard</Link>
                {formattedpath.length > 2 && <div className='xss:text-xs  capitalize cursor-default'>&gt; {formattedpath[2]}</div>}
            </div>
        </div>
    )
}

export default Nav