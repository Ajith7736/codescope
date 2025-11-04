import { ChevronsUpDown, CircleX, Code, Computer, EllipsisVertical, LayoutDashboard, ListCheck } from 'lucide-react'
import React, { useRef } from 'react'
import { motion } from 'motion/react'
import { useMediaQuery } from 'react-responsive'
import { useOutsideClick } from '@/hooks/Outsideclick'
import { signOut, useSession } from '@/lib/auth-client'
import { Linkprops } from '@/types/type'
import Link from 'next/link'
import Loading from '@/app/loading'
import Image from 'next/image'
import { usePage } from '@/context/PageProvider'

function Sidebar({ showsidebar, setshowsidebar }: { showsidebar: boolean, setshowsidebar: React.Dispatch<React.SetStateAction<boolean>> }) {
    const isLargescreen = useMediaQuery({ minWidth: 768 })
    const sideref = useRef<HTMLDivElement>(null);
    const { data: session, isPending } = useSession();
    const { currentpage, setcurrentpage } = usePage();

    const handlelogout = async () => {
        await signOut()
        window.location.href = "/"
    }

    useOutsideClick(sideref, () => setshowsidebar(false), !isLargescreen)


    const Links: Linkprops[] = [
        {
            icon: <LayoutDashboard className='xss:size-4 md:size-5' />,
            name: "dashboard"
        }, {
            icon: <Computer className='xss:size-4 md:size-5' />,
            name: "projects"
        }, {
            icon: <ListCheck className='xss:size-4 md:size-5' />,
            name: "analysis"
        }
    ]

    if (isPending) return <Loading />

    return (
        <motion.div ref={sideref} initial={isLargescreen && { width: 0 }} animate={isLargescreen && { width: showsidebar ? 300 : 78 }} transition={isLargescreen ? { duration: 0.4, ease: "easeInOut" } : {}} className={` bg-light-gray flex flex-col justify-between p-4 dark:bg-dark-gray h-screen md:static xss:absolute border border-l-0 border-b-0 border-t-0 border-light-activeborder/20 dark:border-dark-hoverwhite/20   ${isLargescreen ? 'w-[20rem]' : 'w-[300px]'}  ${showsidebar ? 'xss:left-0' : 'xss:-left-80'} md:transition-none xss:transition-all xss:duration-400 `}>
            <div>
                <div className='flex justify-between w-full items-center '>
                    <div className='flex gap-4 items-center transition-all duration-300 '>
                        <Code className='xss:size-8 md:size-9 bg-blue-500 text-white rounded-xl  p-2' />
                        <div className={`overflow-hidden ${showsidebar ? 'md:visible md:opacity-100' : 'md:invisible md:opacity-0'} transition-all duration-400 ease-in-out`}>Codescope</div>
                    </div>
                    {!isLargescreen && <CircleX size={16} className='cursor-pointer' onClick={() => setshowsidebar(false)} />}
                </div>
                <div className='relative flex flex-col mt-10 gap-3 xss:text-sm md:text-base'>
                    {Links.map((link) => {
                        return <button key={link.name} onClick={() => setcurrentpage(link.name)} className={`${showsidebar ? 'hover:bg-light-activeborder/10' : 'hover:bg-none'} flex p-2 gap-5 rounded-md items-center `}>
                            <div className='flex group' >
                                <div>
                                    {link.icon}
                                </div>
                                {!showsidebar && <motion.div className='absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-400 left-20 bg-light-hovergray border border-light-gray rounded-md shadow-md p-1 w-fit capitalize'>
                                    {link.name}
                                </motion.div>}
                            </div>
                            <div className={`overflow-hidden ${showsidebar ? 'md:visible' : 'md:invisible '} transition-all duration-500 ease-in-out capitalize`}>
                                {link.name}
                            </div>
                        </button>
                    })}
                </div>
            </div>
            <div className={`text-center flex items-center xss:gap-4 ${showsidebar ? 'hover:bg-light-activeborder/10 md:gap-6  hover:dark:bg-dark-hovergray' : 'md:gap-0'}  rounded-lg cursor-pointer transition-all duration-300 p-2`}>
                {session?.user.image ? <Image height={20} width={20} src={session?.user.image} alt="profile pic" className='rounded-full size-7' /> : <div>
                    <div className="relative w-8 h-8 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
                        <svg className="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                </div>}

                <div className={`overflow-hidden ${showsidebar ? 'md:max-w-xs md:opacity-100' : 'md:max-w-0 md:opacity-0'} transition-all duration-300 easeInOut flex flex-col items-start text-xs`}>
                    <div>
                        {session?.user.name}
                    </div>
                    <div>
                        {session?.user.email}
                    </div>
                </div>
                <div className={`overflow-hidden ${showsidebar ? 'md:max-w-xs md:opacity-100' : 'md:max-w-0 md:opacity-0'} transition-all duration-300 ease-in-out flex flex-col items-start text-xs`}>
                    <ChevronsUpDown size={18} />
                </div>
            </div>
        </motion.div>
    )
}

export default Sidebar