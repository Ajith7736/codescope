import { DottedGlowBackground } from '../components/Backgrounds/dotted-glow-background'
import { Code, FolderCode, GitGraph, Github, Shield, TrendingUp } from "lucide-react"
import Card from '../components/card/Card'
import CardProps from '@/types/card'
import Demo from '../components/Demo'
import Footer from './Footer'

function Content() {

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
        <div className='min-h-[90vh] flex flex-col justify-normal'>
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
                <div className='relative z-10 flex flex-col gap-4 justify-center items-center p-10 lg:px-50 xl:px-100 w-full h-full'>
                    <div className="font-extrabold xss:text-3xl lg:text-4xl md:text-5xl text-center">
                        Intelligent Code Analysis
                        <div>Powered By AI</div>
                    </div>
                    <div className="dark:text-dark-hoverwhite text-light-textgray text-center md:text-lg xss:text-base font-bold">Analyze your codebase for architecture issues, Security vunerabilities and performance bottlenecks.Get AI-Powered refactoring suggestions in seconds.</div>
                    <div className='flex gap-5 mt-5'>
                        <button className='bg-light-black dark:bg-dark-white dark:text-dark-black font-bold rounded-md cursor-pointer hover:bg-light-hoverblack transition-all ease-in-out dark:hover:bg-dark-hoverwhite  text-light-white p-2 xss:text-sm md:text-base'>Get Started</button>
                        <button className='p-2 rounded-md cursor-pointer hover:bg-light-hovergray transition-all ease-in-out dark:hover:bg-dark-hovergray dark:bg-dark-hovergray/40 dark:backdrop-blur-2xl xss:text-sm md:text-base'>Github</button>
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
