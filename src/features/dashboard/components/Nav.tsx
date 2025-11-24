import { PanelLeft } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';


function Nav({ handlesidebar }: { handlesidebar: () => void }) {
    const pathname = usePathname();
    const formattedpath = pathname.split("/")
    const path = formattedpath[formattedpath.length - 1];


    return (
        <div className='flex  items-center p-5 gap-3 bg-light-white/10 dark:bg-dark-black/10 backdrop-blur-3xl'>
            <button><PanelLeft onClick={handlesidebar} className='size-5 cursor-pointer' /></button>
            <div className='flex gap-2'>
                <Link href={"/Dashboard"} className={`xss:text-xs  capitalize ${path === "Dashboard" ? "text-black dark:text-white" : "text-light-activeborder"}`}> Dashboard</Link>
                {formattedpath.length > 2 && <div className='xss:text-xs  capitalize cursor-default'>&gt; {path == "Projects" ? formattedpath[2] : <><Link href={"/Dashboard/Projects"}><span className='text-light-activeborder'>{formattedpath[2]}</span></Link> &gt; Analysis</>}</div>}
            </div>
        </div>
    )
}

export default Nav