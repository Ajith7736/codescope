"use client"
import { Code, Github, Shield, TrendingUp } from "lucide-react"
import Card from '../components/card/Card'
import SampleCode from "../components/sample/SampleCode"
import { CardProps, Session } from '@/types/type'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import SampleAnalysis from "../components/sample/SampleAnalysis"

function Content({ session }: { session: Session | null }) {


    const cards: CardProps[] = [
        {
            logo: <Code strokeWidth={3} size={30} />,
            title: "Architecture Analysis",
            desc: "Detect patterns, anti-patterns, and architectural voilations"
        }, {
            logo: <Shield strokeWidth={3} size={30} />,
            title: "Security Scanning",
            desc: "Identify vulnerabilities and security risks in your codebase"
        }, {
            logo: <TrendingUp strokeWidth={3} size={30} />,
            title: "Performance Insights",
            desc: "Find bottlenecks and optimization opportunities"
        }, {
            logo: <Github strokeWidth={2.5} size={30} />,
            title: "Github Integration",
            desc: "Sync repos and analyze on every commit"
        }
    ]

    return (
        <div className='min-h-[90vh] relative flex flex-col justify-center items-center'>
            <div className='min-h-[50vh]'>
                <div className="h-60 w-10 rounded-full bg-indigo-400/30 blur-3xl fixed z-50 -left-15">
                </div>
                <div className="h-60 w-10 rounded-full bg-pink-400/30  blur-3xl fixed z-50 -right-15">
                </div>
                <motion.div initial={{ opacity: 0, translateY: -10 }} whileInView={{ opacity: 1, translateY: 0 }} className='relative z-10 flex flex-col gap-6 justify-center items-center p-10 lg:px-50 xl:px-80 w-full h-full'>
                    <div className="font-extrabold xss:text-4xl  md:text-7xl text-center">
                        Analyze your code
                        at the speed of AI
                    </div>
                    <div className='text-center font-family-sans text-light-activeborder font-semibold xss:text-xs lg:text-sm'>Detect architecture flaws, security risks, and bottlenecks instantly. Get <span className=' text-indigo-600 italic text-base font-family-bebas'>AI-powered</span> refactoring suggestions directly in your repo.</div>
                    <div className='flex gap-5 mt-5'>
                        <Link href={session ? "/Dashboard" : "/Signup"}><button className={cn('bg-indigo-600 rounded-[3px] cursor-pointer hover:bg-indigo-700 transition duration-300 text-light-white p-3  xss:text-base md:text-base font-extrabold text-white shadow-md shadow-indigo-500 dark:shadow-none')}>Start Your Analysis</button></Link>
                        <button className='p-2 rounded-md cursor-pointer hover:bg-light-surface-hover hover:dark:bg-dark-surface-hover/50 transition duration-300 dark:backdrop-blur-2xl xss:text-sm md:text-base'>Github</button>
                    </div>
                </motion.div>
            </div>

            <div className='relative p-5 flex flex-col md:flex-wrap gap-5 md:flex-row z-10 md:items-center justify-center bg-light-border/20 dark:bg-dark-surface-hover/10 '>
                {cards.map((card) => {
                    return <Card key={card.title} logo={card.logo} title={card.title} desc={card.desc} />
                })}
            </div>

            <motion.div initial={{ opacity : 0 , translateY : -50}} whileInView={{opacity : 1 , translateY : 0}} className="flex relative  flex-col lg:flex-row gap-3 items-baseline justify-between m-5">
                <SampleCode />
                <SampleAnalysis />
            </motion.div>


        </div>

    )
}

export default Content
