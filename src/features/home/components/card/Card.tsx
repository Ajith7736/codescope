import React from 'react'
import { motion } from 'framer-motion'

function Card({ logo, title, desc }: { logo: React.ReactElement, title: string, desc: string }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeInOut" }} viewport={{ once: true }} className=' bg-light-gray/30 relative backdrop-blur-2xl overflow-hidden p-5 dark:bg-dark-gray/20 rounded-[17px]  w-full  md:w-[45%] border hover:border-light-accent/50 border-light-border transition-all duration-300 z-20 dark:border-dark-border'>
            <div className='flex flex-col gap-3 items-start'>
                <div className="h-20 w-20 rounded-full dark:bg-indigo-600  blur-3xl absolute -left-5 -bottom-5">
                </div>
                <div className='bg-linear-to-br from-indigo-600/20 via-indigo-600/10 to-indigo-600/10 border border-indigo-600/50 text-indigo-600/80 shadow-light-activeborder/90 shadow-md dark:shadow-lg dark:shadow-black group-hover:border-light-activeborder/50 transition-all duration-700 rounded-sm sm:rounded-md dark:bg-dark-activeborder/10 xss:p-2 sm:p-4  '>{logo}</div>
                <div className=' font-bold xss:text-[12px] sm:text-[14px]'>{title}</div>
                <div className='xss:text-[9px] sm:text-[11px] text-light-text-muted italic'>{desc}</div>
            </div>
        </motion.div>
    )
}

export default Card
