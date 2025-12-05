import Card from '@/features/pricing/components/Card'
import { auth } from '@/lib/auth'
import { plansprops } from '@/types/type'
import { MoveLeft } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'

async function PricingContent() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const plans: plansprops[] = [
        {
            pricing: "$0",
            plantype: "Free Tier",
            plandesc: "Unleash the power of google gemini",
            planadv: [
                {
                    message: "Limited AI Analysis"
                }, {
                    message: "1 codebase Report"
                }, {
                    message: "Slow Queue Processing"
                }
            ]
        },
        {
            pricing: "$5",
            plantype: "Basic",
            plandesc: "Unleash the power of google gemini",
            planadv: [
                {
                    message: "upto 10 codebase reports"
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
            <Link href={session ? '/Dashboard' : '/'} className='flex gap-2 text-sm items-center dark:hover:bg-dark-surface-hover transition-all duration-300 p-3 rounded-md'><MoveLeft size={13} />Back</Link>
            <section className='flex flex-col  items-center w-full'>
                <header>
                    <h1 className='text-center font-extrabold text-4xl'>BILLING</h1>
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

export default PricingContent

