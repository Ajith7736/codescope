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
                    return <motion.p key={indx} initial={{ filter: "blur(8px)", y: 20 }} animate={{ filter: "blur(0px)", y: 0 }} transition={{ duration: .4, delay: .1 * indx, ease: "easeOut" }} viewport={{ once: true }} className={`font-extrabold xss:text-4xl inline-block  md:text-7xl mr-4 ${word === "Github" && 'text-dark-accent'}`}>
                        {word}
                    </motion.p>
                })}
            </div>
            <div className='text-center font-family-sans text-light-activeborder font-semibold xss:text-xs lg:text-sm'>Detect architecture flaws, security risks, and bottlenecks instantly. Get <span className=' text-indigo-600 italic text-base font-family-bebas'>AI-powered</span> refactoring suggestions directly in your repo.</div>
            <div className='flex gap-5 mt-5 items-center'>
                <Link href={session ? "/Dashboard" : "/Signup"}><button className={cn('bg-indigo-600 rounded-[3px] cursor-pointer hover:bg-indigo-700 transition duration-300 text-light-white p-3  xss:text-base xss:text-[11px] md:text-base font-extrabold text-white shadow-md shadow-indigo-500 dark:shadow-none')}>Start Your Analysis</button></Link>
                <Link href={"https://github.com/Ajith7736/codescope"} target="_blank"><button className='p-3 rounded-md cursor-pointer hover:bg-light-surface-hover hover:dark:bg-dark-surface-hover/50 transition duration-300 dark:backdrop-blur-2xl xss:text-sm md:text-base'>Github</button></Link>
            </div>
        </motion.div>
    )
}

export default MainTitle