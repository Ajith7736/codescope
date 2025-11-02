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

function Sidebar({ showsidebar, setshowsidebar }: { showsidebar: boolean, setshowsidebar: React.Dispatch<React.SetStateAction<boolean>> }) {
    const isLargescreen = useMediaQuery({ minWidth: 768 })
    const sideref = useRef<HTMLDivElement>(null);
    const { data: session, isPending } = useSession();

    const handlelogout = async () => {
        await signOut()
        window.location.href = "/"
    }

    useOutsideClick(sideref, () => setshowsidebar(false), !isLargescreen)


    const Links: Linkprops[] = [
        {
            icon: <LayoutDashboard className='xss:size-4 md:size-5' />,
            link: "/Dashboard",
            name: "Dashboard"
        }, {
            icon: <Computer className='xss:size-4 md:size-5' />,
            link: "/",
            name: "Projects"
        }, {
            icon: <ListCheck className='xss:size-4 md:size-5' />,
            link: "/",
            name: "Analysis"
        }
    ]

    if (isPending) return <Loading />

    return (
        <motion.div ref={sideref} initial={isLargescreen && { width: 0 }} animate={isLargescreen ? { width: showsidebar ? 300 : 70 } : {}} transition={isLargescreen ? { duration: 0.4, ease: "easeInOut" } : {}} className={` bg-light-gray flex flex-col justify-between p-4 dark:bg-dark-gray h-screen md:static xss:absolute border border-l-0 border-b-0 border-t-0 border-light-activeborder/20 dark:border-dark-hoverwhite/20   ${isLargescreen ? 'w-[20rem]' : 'w-[300px]'}  ${showsidebar ? 'xss:left-0' : 'xss:-left-80'} md:transition-none xss:transition-all xss:duration-400 `}>
            <div>
                <div className='flex justify-between w-full items-center trans'>
                    <div className='flex gap-2 items-center  transition-all duration-300 '>
                        <Code className='xss:size-8 md:size-9 bg-blue-500 text-white rounded-xl  p-2' />
                        <motion.div initial={{ scale: 0 }} animate={isLargescreen ? { scale: showsidebar ? 1 : 0 , opacity: showsidebar ? 1 : 0 } : { scale: 1 , opacity : 1}} transition={{ duration: 0.3, ease: "easeInOut" }} style={{ originX: 0 }}>Codescope</motion.div>
                    </div>
                    {!isLargescreen && <CircleX size={16} className='cursor-pointer' onClick={() => setshowsidebar(false)} />}
                </div>
                <div className='flex flex-col mt-10 gap-3 xss:text-sm md:text-base'>
                    {Links.map((link) => {
                        return <Link href={link.link} key={link.name} className='hover:bg-light-activeborder/10 flex p-2 rounded-md items-center'>
                            <div className='w-9'>
                                {link.icon}
                            </div>
                            <motion.div initial={{ scale: 0}} animate={isLargescreen ? { scale: showsidebar ? 1 : 0 , opacity: showsidebar ? 1 : 0 } : { scale: 1 , opacity : 1}} transition={{ duration: 0.3, ease: "easeInOut" , delay : 0}} style={{ originX: 0 }}>
                                {link.name}
                            </motion.div>
                        </Link>
                    })}
                </div>
            </div>

            <div className='w-full text-center flex justify-between items-center hover:bg-light-activeborder/10 hover:dark:bg-dark-hovergray rounded-lg cursor-pointer transition-all duration-300 p-2' onClick={handlelogout}>
                <div>
                    {session?.user.image ? <Image width={30} height={30} className={`rounded-full`} src={session?.user?.image} alt='profile pic' />
                        :
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </div>
                    }
                </div>
                <motion.div initial={{ scale: 0}} animate={isLargescreen ? { scale: showsidebar ? 1 : 0 , opacity: showsidebar ? 1 : 0 } : { scale: 1 , opacity : 1}} transition={{ duration: 0.3, ease: "easeInOut" , delay : 0}} style={{ originX: 0 }} className='flex flex-col items-start text-xs'>
                    <div>
                        {session?.user.name}
                    </div>
                    <div>
                        {session?.user.email}
                    </div>
                </motion.div>
                <motion.div initial={{ scale: 0}} animate={isLargescreen ? { scale: showsidebar ? 1 : 0 , opacity: showsidebar ? 1 : 0 } : { scale: 1 , opacity : 1}} transition={{ duration: 0.3, ease: "easeInOut" , delay : 0}} style={{ originX: 0 }}>
                    <ChevronsUpDown size={18} />
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Sidebar