import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Session } from '@/types/type'

function MainTitle({ session }: { session: Session | null }) {

    const headline = 'Analyze your whole Github codebase at the speed of AI'
    const words = headline.split(" ");

    return (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className='relative z-10 flex flex-col gap-6 justify-center items-center p-10 lg:px-50 xl:px-80 w-full h-full '>
            <div className='text-center'>
                {words.map((word, indx) => {
                    return <motion.h1 key={indx} initial={{ filter: "blur(8px)", scale : .8 , opacity : 0 }} animate={{ filter: "blur(0px)", scale : 1 , opacity : 1}} transition={{ duration: .6, delay: Math.random(), ease: "easeInOut" }} viewport={{ once: true }} className={`font-bold  xss:text-4xl inline-block tracking-wide md:text-7xl mr-4 ${word === "Github" && 'text-dark-accent'}`}>
                        {word}
                    </motion.h1>
                })}
            </div>
            <motion.div initial={{opacity : 0}} animate={{opacity : 1}} transition={{ duration : 2 , ease : "easeInOut"}} className='text-center font-family-sans text-light-activeborder font-bold xss:text-xs sm:text-sm tracking-widest italic w-[78%]'>Detect architecture flaws, security risks, and bottlenecks instantly.</motion.div>
            <motion.div initial={{opacity : 0}} animate={{opacity : 1}} transition={{ duration : 2 , ease : "easeInOut"}} className='flex gap-5 mt-5 items-center'>
                <Link href={session ? "/Dashboard" : "/Signup"}><button className={cn('bg-linear-to-r from-indigo-700 via-indigo-600 to-indigo-700 rounded-[3px] cursor-pointer hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-600 transition duration-500 text-light-white h-12 xss:w-45 md:w-65  xss:text-base xss:text-[11px] md:text-sm font-extrabold tracking-widest uppercase text-white shadow-md shadow-indigo-500 dark:shadow-none')}>Start Your Analysis</button></Link>
                <Link href={"https://github.com/Ajith7736/codescope"} target="_blank"><button className='p-3 rounded-md cursor-pointer hover:bg-light-surface-hover hover:dark:bg-dark-surface-hover/50 transition duration-300 dark:backdrop-blur-2xl xss:text-xs md:text-sm uppercase tracking-widest'>Github</button></Link>
            </motion.div>
        </motion.div>
    )
}

export default MainTitle