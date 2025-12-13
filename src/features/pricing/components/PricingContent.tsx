"use client"
import { useSession } from "@/lib/auth-client"
import { plansprops } from "@/types/type"
import Button from "@/ui/Buttons/Button"
import { CircleCheck, MoveLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export const PricingContent = () => {
    const { data: session } = useSession();
    const router = useRouter();
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
                }, {
                    message: "AI-powered fix suggestions"
                }, {
                    message: "Full Security, performance and architecture analysis"
                }, {
                    message: "AI Repo Overview"
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
                    message: "10 Analysis per month"
                }, {
                    message: "AI-powered fix suggestions"
                }, {
                    message: "Full Security, performance and architecture analysis"
                }, {
                    message: "AI Repo Overview"
                }
            ]
        },
        {
            pricing: "$20",
            plantype: "Pro",
            plandesc: "Unleash the power of google gemini",
            planadv: [
                {
                    message: "Unlimited Projects"
                }, {
                    message: "Unlimited Analysis"
                }, {
                    message: "AI-powered fix suggestions"
                }, {
                    message: "Full Security, performance and architecture analysis"
                }, {
                    message: "AI Repo Overview"
                }
            ]
        }
    ]

    return (
        <div className="bg-black py-5 min-h-screen">
            <div className="mx-5 w-fit">
                <Link href={"/"} className="flex gap-3 items-center hover:bg-dark-surface p-3 text-sm rounded-md"><MoveLeft className="size-4" /><span>Back</span></Link>
            </div>
            <div className="flex flex-col items-center gap-5 px-5">
                <h1 className="text-3xl font-extrabold">Billing</h1>

                <div className="flex xss:flex-col md:flex-row w-full md:h-[60vh] md:items-center md:justify-center gap-5">
                    {plans.map((item, index) => {
                        return <div key={index} className="conic p-px rounded-xl">
                            <div className="bg-black flex flex-col items-baseline gap-5 w-full h-[50vh] justify-between relative p-5 overflow-hidden rounded-xl">
                                <div className="size-20 bg-white/30 blur-2xl -top-5 -left-5 absolute rounded-full z-10"></div>
                                <h1 className="font-extrabold text-2xl">{item.pricing}</h1>
                                <h1 className="text-base font-bold">{item.plantype}</h1>
                                <p className="text-xs text-gray-600 italic">{item.plandesc}</p>
                                <hr className="dark:border-gray-600/30 border w-full" />
                                <div className="flex flex-col gap-3">
                                    {item.planadv.map((adv, idx) => {
                                        return <p key={idx} className="text-xs flex items-center gap-3"><CircleCheck className="size-4 text-emerald-600" />{adv.message}</p>
                                    })}
                                </div>
                              {session ?  <Button className="rounded-full font-extrabold w-[40%]">Buy</Button> :  <Button onClick={() => { router.push("/Signup")}} className="font-extrabold w-full">Get Started</Button>} 
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>

    )
}