import { ChartLine, ChevronsUpDown, CircleX, ClipboardList, Code, Computer, CreditCard, LayoutDashboard, Settings } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useMediaQuery } from 'react-responsive'
import { useOutsideClick } from '@/hooks/Outsideclick'
import { useSession } from '@/lib/auth-client'
import Loading from '@/app/loading'
import Image from 'next/image'
import UserBlock from './UserBlock'
import { usePathname, useRouter } from 'next/navigation'
import { useSidebar } from '@/context/SidebarProvider'
import { cn } from '@/lib/utils'
import { usePage } from '@/context/PageProvider'
import { Links, ProductLink } from '@/lib/Sidebarprops'

function Sidebar() {
    const isLargescreen = useMediaQuery({ minWidth: 768 })
    const sideref = useRef<HTMLDivElement>(null);
    const userref = useRef<HTMLButtonElement>(null);
    const { setshowsidebar, showsidebar } = useSidebar();
    const { data: session, isPending } = useSession();
    const [showuserblock, setshowuserblock] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();
    const page = pathname.split("/")[pathname.split("/").length - 1];
    const [isProductPage, setisProductPage] = useState(false)
    const { currentprojectpage, setcurrentprojectpage } = usePage();


    useEffect(() => {
        if (pathname.startsWith("/Dashboard/Projects/")) {
            setisProductPage(true)
        } else {
            setisProductPage(false);
        }
    }, [pathname])


    useOutsideClick(sideref, () => {
        setshowsidebar(false)
        setshowuserblock(false)
    }, !isLargescreen)

    useOutsideClick(userref, () => {
        setshowuserblock(false)
    })



    if (isPending) return <Loading />


    return (
        <motion.div ref={sideref} initial={isLargescreen && { width: 0 }} animate={isLargescreen ? { width: showsidebar ? 320 : 77 } : { width: 320 }} transition={isLargescreen ? { duration: 0.4, ease: "easeInOut" } : {}} className={`z-10 bg-light-gray flex flex-col justify-between xss:p-4 lg:p-4 ${showsidebar ? 'md:px-2' : 'md:p-4'} bg-light-surface dark:bg-gray-950 md:static xss:absolute border-r border-light-border dark:border-dark-border/60   ${isLargescreen ? 'w-[20rem]' : 'w-[300px]'}  ${showsidebar ? 'xss:left-0' : 'xss:-left-80'} md:transition-none xss:transition-all xss:duration-400 overflow-hidden fixed min-h-dvh`}>
            <div>
                <div className='flex justify-between w-full items-center '>
                    <div className='flex gap-4 items-center transition-all duration-300 '>
                        <Code strokeWidth={4} className='xss:size-8 md:size-9 bg-indigo-600 text-white rounded-xl  p-2' />
                        <div className={` overflow-hidden ${showsidebar ? 'md:visible md:opacity-100' : 'md:invisible md:opacity-0'} transition-all duration-400 ease-in-out tracking-widest `}>Codescope</div>
                    </div>
                    {!isLargescreen && <CircleX size={16} className='cursor-pointer' onClick={() => setshowsidebar(false)} />}
                </div>
                <div className='relative flex flex-col mt-10 gap-3 xss:text-sm'>
                    {(isProductPage ? ProductLink : Links).map((link) => {
                        return <div
                            key={link.name}
                            onClick={() => {
                                if (!isLargescreen) setshowsidebar(false)
                                if (link.name === "projects") {
                                    router.push("/Dashboard/Projects")
                                } else if (link.name === "dashboard") {
                                    router.push("/Dashboard")
                                } else if (link.name === "analysis") {
                                    currentprojectpage !== link.name && setcurrentprojectpage("analysis")
                                } else if (link.name === "overview") {
                                    currentprojectpage !== link.name && setcurrentprojectpage("overview")
                                } else if (link.name === "settings") {
                                    currentprojectpage !== link.name && setcurrentprojectpage("settings")
                                } else if (link.name === "billing") {
                                    router.push("/Billing");
                                }
                            }}
                            className={cn(`py-3 hover:rounded-md ${link.name !== page.toLowerCase() && currentprojectpage !== link.name && (showsidebar ? `hover:bg-indigo-500/10 hover:dark:text-dark-text-on-hover hover:text-light-text-on-hover` : `hover:text-light-text-on-hover hover:dark:text-dark-text-on-hover`)} relative cursor-pointer ${link.name === page.toLowerCase() || (currentprojectpage === link.name && isProductPage) ? `${isLargescreen ? (showsidebar ? 'text-indigo-500 bg-indigo-500/10' : 'text-indigo-500') : 'text-indigo-500 bg-indigo-500/10'}` : 'text-light-text-muted dark:text-dark-text-muted'}`, link.css)}>
                            <div className={`flex items-center w-full gap-4 ${showsidebar ? 'px-4' : 'px-2'} transition-all duration-300`}>
                                {(link.name === page.toLowerCase() || currentprojectpage === link.name) && showsidebar && <div className={`absolute left-0 bg-indigo-500 w-[3px] h-6 rounded-r-full `}></div>}
                                <div className={'flex group'} >
                                    <button className='cursor-pointer'>
                                        {link.icon}
                                    </button>
                                    {!showsidebar && <motion.button className='fixed text-indigo-500 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-400 left-20 bg-light-hovergray border dark:bg-dark-surface border-light-gray dark:border-dark-border rounded-md shadow-md px-2 py-1 w-fit capitalize'>
                                        {link.name}
                                    </motion.button>}
                                </div>
                                <div className={`overflow-hidden ${showsidebar ? 'md:visible' : 'md:invisible '} transition-all duration-500 ease-in-out capitalize`}>
                                    {link.name}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className={`text-center flex justify-between items-center xss:gap-4 md:gap-3 ${showsidebar && 'hover:bg-dark-accent/10 lg:gap-6  hover:dark:bg-dark-hovergray justify-center'} min-w-4 rounded-lg cursor-pointer transition-all duration-300 xss:p-2 md:p-1.5 lg:p-2`}>
                {session?.user?.image ?
                    <Image
                        height={15}
                        width={15}
                        src={session?.user?.image}
                        alt="profile pic"
                        className='rounded-full size-6.5'
                        onClick={() => {
                            if (!showsidebar) setshowsidebar(true)
                        }}
                    />
                    :
                    <div
                        onClick={() => {
                            if (!showsidebar) setshowsidebar(true)
                        }}>
                        <div className="relative w-8 h-8 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
                            <svg className="absolute w-10 h-10 text-gray-400 -left-1 top-px" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </div>
                    </div>}
                <div className={`overflow-hidden ${showsidebar ? 'md:visible ' : 'md:invisible'} min-w-fit transition-all duration-300 easeInOut flex flex-col items-start text-xs`}>
                    <div>
                        {session?.user?.name}
                    </div>
                    <div>
                        {session?.user?.email}
                    </div>
                </div>
                <button ref={userref} className={`overflow-hidden relative ${showsidebar ? ' md:opacity-100' : 'md:opacity-0'} transition-all duration-300 ease-in-out flex flex-col items-start text-xs`}>
                    <ChevronsUpDown className='size-4' onClick={() => setshowuserblock(!showuserblock)} />
                    <div className='fixed xss:right-3 md:left-70  bottom-20 w-fit'>
                        <AnimatePresence>
                            {showuserblock && <UserBlock setshowuserblock={setshowuserblock} />}
                        </AnimatePresence>
                    </div>
                </button>
            </div>
        </motion.div>
    )
}

export default Sidebar