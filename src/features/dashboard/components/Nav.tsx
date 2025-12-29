import ThemeToggler from '@/ui/Theme/ThemeToggler';
import { PanelLeft, Settings } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';


function Nav({ handlesidebar }: { handlesidebar: () => void }) {
    const pathname = usePathname();
    const formattedpath = pathname.split("/")
    const path = formattedpath[formattedpath.length - 1];



    return (
        <div className=' p-5 flex justify-between bg-light-background dark:bg-dark-background '>
            <div className='flex items-center gap-3 '>
                <button><PanelLeft onClick={handlesidebar} className='size-4 cursor-pointer' /></button>
                <div className='flex gap-2'>
                    <Link href={"/Dashboard"} className={`xss:text-xs  capitalize ${path === "Dashboard" ? "text-black dark:text-white" : "text-gray-600"}`}> DASHBOARD</Link>
                    {formattedpath.length > 2 && <div className='xss:text-xs  capitalize cursor-default'>&gt; {path == "Projects" ? formattedpath[2].toUpperCase() : <><Link href={"/Dashboard/Projects"}><span className='text-light-text-on-hover dark:text-dark-text-on-hover'>{formattedpath[2].toUpperCase()}</span></Link></>}</div>}
                </div>
            </div>
            <div>
                <ThemeToggler />
            </div>
        </div>
    )
}

export default Nav