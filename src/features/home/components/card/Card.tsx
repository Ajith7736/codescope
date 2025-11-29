import React from 'react'
import {motion} from 'framer-motion'

function Card({ logo, title, desc }: { logo: React.ReactElement, title: string, desc: string }) {
    return (
        <motion.div initial={{opacity : 0}} whileInView={{opacity : 1}} transition={{ ease : "easeInOut"}} className=' bg-light-gray/30 relative backdrop-blur-2xl overflow-hidden p-5 dark:bg-dark-gray/20 rounded-[17px]  w-full  md:w-[40%] border hover:border-light-accent/50 border-light-border transition-all duration-300 z-20 dark:border-dark-border'>
            <div className='flex flex-col gap-3 items-start'>
                <div className="h-20 w-20 rounded-full dark:bg-indigo-600  blur-3xl absolute -left-5 -bottom-5">
                </div>
                <div className='bg-indigo-600 shadow-light-activeborder/90 shadow-md dark:shadow-lg dark:shadow-black group-hover:border-light-activeborder/50 transition-all duration-700 rounded-[14px] dark:bg-dark-activeborder/10 p-4   text-white'>{logo}</div>
                <div className=' font-bold xss:text-base'>{title}</div>
                <div className='text-xs text-light-text-muted italic'>{desc}</div>
            </div>
        </motion.div>
    )
}

export default Card
