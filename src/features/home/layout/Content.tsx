"use client"
import { Code, Github, Shield, TrendingUp } from "lucide-react"
import Card from '../components/card/Card'
import { CardProps, Session } from '@/types/type'
import TextHeader from "../components/text/TextHeader"
import Footer from "./Footer"
import SeperatorLine from "../components/seperator/SeperatorLine"
import HowtoUse from "../components/howtouse/HowtoUse"
import Questions from "../components/faq/Questions"
import Sample from "../components/sample/Sample"
import MainTitle from "../components/MainTitle/MainTitle"
import { motion } from "framer-motion"

function Content({ session }: { session: Session | null }) {


    const cards: CardProps[] = [
        {
            logo: <Code strokeWidth={3} className="xss:size-5 sm:size-7" />,
            title: "Architecture Analysis",
            desc: "Detect patterns, anti-patterns, and architectural voilations"
        }, {
            logo: <Shield strokeWidth={3} className="xss:size-5 sm:size-7" />,
            title: "Security Scanning",
            desc: "Identify vulnerabilities and security risks in your codebase"
        }, {
            logo: <TrendingUp strokeWidth={3} className="xss:size-5 sm:size-7" />,
            title: "Performance Insights",
            desc: "Find bottlenecks and optimization opportunities"
        }, {
            logo: <Github strokeWidth={2.5} className="xss:size-5 sm:size-7" />,
            title: "Github Integration",
            desc: "Sync repos and analyze on every commit"
        }
    ]


    return (
        <main className='relative flex flex-col justify-center items-center gap-3'>
            
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="text-xs text-indigo-600 px-2 py-1 border border-indigo-500/40 rounded-full w-fit text-center">Powered by Gemini AI</motion.p>
            
            <header className='min-h-[50vh] flex flex-col items-center mb-5'>
                <div className="h-60 w-10 rounded-full bg-indigo-400/30 blur-3xl fixed z-50 -left-15">
                </div>
                <div className="h-60 w-10 rounded-full bg-pink-400/30  blur-3xl fixed z-50 -right-15">
                </div>
                <MainTitle session={session} />
                <SeperatorLine />
            </header>

            {/* Cards Section */}
            <section className='relative max-w-6xl mx-auto xss:gap-5 px-3 grid w-screen grid-cols-[repeat(auto-fit,minmax(370px,1fr))] z-10 bg-light-border/20 dark:bg-dark-surface-hover/10'>
                {cards.map((card) => {
                    return <Card key={card.title} logo={card.logo} title={card.title} desc={card.desc} />
                })}
            </section>

            {/* Sample code and Analysis */}
            <Sample />


            {/* How to use */}
            <HowtoUse />


            {/* FAQ */}
            <Questions />



            <TextHeader />


            <Footer />


        </main>

    )
}

export default Content
