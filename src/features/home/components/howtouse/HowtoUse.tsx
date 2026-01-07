import ProjectText from '@/ui/Text/ProjectText'
import SmallText from '@/ui/Text/SmallText'
import { OctagonAlert } from 'lucide-react'
import { motion } from 'framer-motion'

function HowtoUse() {

    const contents = [
        {
            title: "PASTE YOUR REPO LINK",
            desc: "Copy and paste your github repo link and click on add project."
        }, {
            title: "SELECT ANALYSIS",
            desc: "Select an analysis from architecture, security, performance."
        }, {
            title: "START ANALYSIS",
            desc: "Click on analyze to start your analysis."
        }, {
            title: "REFETCH ON NEW COMMITS",
            desc: "Click refetch button to fetch newly committed code."
        }
    ]

    return (
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeInOut" }} className='xss:flex mt-10  xss:flex-col md:flex-row xss:items-center md:justify-center md:gap-15 xss:gap-10 '>
            <div className='xss:w-[90%] md:w-[60%] flex flex-col xss:items-center gap-4'>
                <h2 className='xss:text-2xl md:text-4xl xss:text-center md:text-start font-extrabold'>Improve your <span className='text-indigo-500'>code quality</span></h2>
                <SmallText className=' xss:text-center md:text-start text-gray-500'>Stop thinking about code bugs and issues codescope will help you with that.</SmallText>
                <div className='flex flex-col gap-5'>
                    {contents.map((content, indx) => {
                        return <div key={indx} className='flex gap-5 group xss:items-center md:items-start'>
                            <h5 className='rounded-full xss:text-xs sm:text-sm md:text-base border transition-all duration-300 group-hover:bg-dark-accent/20 border-light-border dark:border-dark-border h-12 flex items-center justify-center  text-indigo-500 font-extrabold min-w-12'>
                                {`0` + (indx + 1)}
                            </h5>
                            <div className='flex flex-col gap-2'>
                                <ProjectText >{content.title}</ProjectText>
                                <SmallText className='text-gray-500'>{content.desc}</SmallText>
                            </div>
                        </div>
                    })}
                </div>

            </div>

            <div aria-hidden="true" className='xss:hidden md:block bg-light-surface dark:bg-dark-surface border p-10 border-light-border dark:border-dark-border rounded-md h-[50vh] xss:w-[70vw] md:w-[30vw] lg:w-[25vw] xl:w-[20vw]'>
                <div className='border border-light-border dark:border-dark-border rounded-md h-full relative flex items-center justify-center'>
                    <div className='bg-indigo-600 h-25 absolute  w-25 rounded-full blur-3xl animate-pulse'></div>
                    <OctagonAlert className='size-15 text-indigo-600' />
                </div>
            </div>

        </motion.section>
    )
}

export default HowtoUse