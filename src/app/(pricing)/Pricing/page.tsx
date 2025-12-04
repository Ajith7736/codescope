import Card from '@/features/pricing/components/Card'
import { plansprops } from '@/types/type'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'

function Page() {


    const plans: plansprops[] = [
        {
            pricing: "$0",
            plantype: "Free Tier",
            plandesc: "Unleash the power of google gemini",
            planadv: [
                {
                    message: "Only 1 Project"
                }, {
                    message: "Total 3 Analysis"
                }
            ]
        },
        {
            pricing: "$5",
            plantype: "Basic",
            plandesc: "Unleash the power of google gemini",
            planadv: [
                {
                    message: "Add upto 10 projects"
                }, {
                    message: "Total 10 Analysis"
                }
            ]
        },
        {
            pricing: "$10",
            plantype: "Pro",
            plandesc: "Unleash the power of google gemini",
            planadv: [
                {
                    message: "Unlimited Projects"
                }, {
                    message: "Unlimited Ai Analysis"
                }
            ]
        }
    ]

    return (
        <div className='p-5 flex flex-col items-start h-screen'>
            <Link href={'/'} className='flex gap-2 text-sm items-center dark:hover:bg-dark-surface-hover transition-all duration-300 p-3 rounded-md'><MoveLeft size={13} />Back</Link>
            <section className='flex flex-col  items-center w-full'>
                <header>
                    <h1 className='text-center font-extrabold text-4xl'>PRICING</h1>
                </header>
                <div className='p-10 w-screen flex xss:flex-col md:flex-row xss:justify-center md:justify-center gap-4'>
                    {plans.map((item, i) => {
                        return <Card key={i} item={item} />
                    })}
                </div>

            </section>
        </div>

    )
}

export default Page
