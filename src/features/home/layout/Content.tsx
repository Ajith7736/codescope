
import { DottedGlowBackground } from '../components/Backgrounds/dotted-glow-background'
import { Code, Github, Shield, TrendingUp } from "lucide-react"
import Card from '../components/card/Card'
import { CardProps, Session } from '@/types/type'
import Demo from '../components/Demo'
import Footer from './Footer'
import Link from 'next/link'


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
        <div className='min-h-[90vh] flex flex-col justify-center items-center'>
            <div className='min-h-[50vh]'>
                {/* <div className='h-[50vh] absolute w-full'>
                    <DottedGlowBackground
                        className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100"
                        opacity={1}
                        gap={10}
                        radius={1.6}
                        colorLightVar="--color-neutral-500"
                        glowColorLightVar="--color-neutral-600"
                        colorDarkVar="--color-neutral-500"
                        glowColorDarkVar="--color-sky-800"
                        backgroundOpacity={0}
                        speedMin={0.3}
                        speedMax={1.6}
                        speedScale={1}
                    />
                </div> */}
                <div className='relative z-10 flex flex-col gap-6 justify-center items-center p-10 lg:px-50 xl:px-100 w-full h-full'>
                    <div className="font-extrabold font-sans xss:text-4xl  md:text-7xl text-center">
                        Analyze your code
                        at the speed of AI
                    </div>
                    <div className='text-center text-light-activeborder xss:text-xs lg:text-sm'>Detect architecture flaws, security risks, and bottlenecks instantly. Get <span className='font-bold dark:text-white text-black'>AI-powered</span> refactoring suggestions directly in your workflow.</div>
                    <div className='flex gap-5 mt-5'>
                        <Link href={session ? "/Dashboard" : "/Signup"}><button className='bg-light-black dark:bg-dark-white dark:text-dark-black rounded-md cursor-pointer hover:bg-light-hoverblack transition duration-300 dark:hover:bg-dark-hoverwhite  text-light-white p-3 shadow-light-activeborder shadow-md dark:shadow-none xss:text-base md:text-base font-extrabold'>Start Your Analysis</button></Link>
                        <button className='p-2 rounded-md cursor-pointer hover:bg-light-hovergray transition duration-300 dark:hover:bg-dark-hovergray dark:bg-dark-hovergray/40 dark:backdrop-blur-2xl xss:text-sm md:text-base'>Github</button>
                    </div>
                </div>
            </div>

            <div className='w-full p-5 flex flex-col md:flex-wrap gap-5 md:flex-row md:items-center justify-center'>
                {cards.map((card) => {
                    return <Card key={card.title} logo={card.logo} title={card.title} desc={card.desc} />
                })}
            </div>

            <div className='m-5'>
                <Demo />
            </div>

            <Footer />

        </div>

    )
}

export default Content
