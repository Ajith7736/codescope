import { CircleX } from 'lucide-react'
import React, { useRef } from 'react'
import { motion } from 'motion/react'
import { useMediaQuery } from 'react-responsive'
import { useOutsideClick } from '@/hooks/Outsideclick'

function Sidebar({ showsidebar, setshowsidebar }: { showsidebar: boolean, setshowsidebar: React.Dispatch<React.SetStateAction<boolean>> }) {
    const isLargescreen = useMediaQuery({ minWidth: 768 })
    const sideref = useRef<HTMLDivElement>(null);

    useOutsideClick(sideref, () => setshowsidebar(false), !isLargescreen)

    return (
        <motion.div ref={sideref} initial={isLargescreen && { width: 0 }} animate={isLargescreen ? { width: showsidebar ? 300 : 0 } : {}} transition={isLargescreen ? { duration: 0.4, ease: "easeInOut" } : {}} className={` bg-light-gray flex justify-between p-5 dark:bg-dark-gray h-screen md:static xss:absolute border border-l-0 border-b-0 border-t-0 dark:border-dark-hoverwhite/20   ${isLargescreen ? 'w-[20rem]' : 'w-[20rem]'}  ${showsidebar ? 'xss:left-0' : 'xss:-left-80'} md:transition-none xss:transition-all xss:duration-400 `}>
            Sidebar {!isLargescreen && <CircleX onClick={() => setshowsidebar(false)} />}
        </motion.div>
    )
}

export default Sidebar