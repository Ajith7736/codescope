"use client"
import Loading from "@/app/loading"
import { useSession } from "@/lib/auth-client"
import { createsubscription } from "@/lib/server/api/razorpay"
import { plansprops } from "@/types/type"
import { CircleCheck, MoveLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Script from "next/script"
import Razorpay from "razorpay"
import { toast } from "sonner"

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
            pricing: "₹450",
            planid: "plan_RrSQ6bSBukqbhd",
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
            pricing: "₹950",
            plantype: "Pro",
            planid: "plan_RrTr6F3i1WhfNg",
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

    const currentplan = "Free Tier";


    const handlerazorpay = async (planId: string | undefined) => {
        const data = await createsubscription(planId, session?.user.id);

        // if(!(window as any).Razorpay){
        //     toast.error("Razorpay SDK not loaded");
        // }

        // const rzp = new Razorpay({
        //     key_id : data.key,

        // })

    }

    if (!session) return <Loading />

    return (
        <div className="bg-black py-5 min-h-screen">
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />
            <div className="mx-5 w-fit">
                <Link href={session ? "/Dashboard" : "/"} className="flex gap-3 items-center hover:bg-dark-surface transition-all duration-300 p-3 text-sm rounded-md"><MoveLeft className="size-4" /><span>Back</span></Link>
            </div>
            <div className="flex flex-col items-center gap-10 px-5">
                <h1 className="text-3xl font-extrabold">Billing</h1>
                <div className="flex xss:flex-col md:flex-row w-full md:h-[60vh] md:items-center md:justify-center gap-5">
                    {plans.map((item, index) => {
                        return <div key={index} className={`${currentplan === item.plantype ? 'bg-white/50' : 'conic'} relative p-px rounded-xl`}>
                            {currentplan === item.plantype && <div className="bg-white w-fit text-dark-background px-3 py-[2px] rounded-t-md text-[10px] font-extrabold absolute flex items-center justify-center -top-[21px] left-2">Current Plan</div>}
                            <div className="bg-black flex flex-col items-baseline gap-5 w-full h-[60vh] justify-between relative p-5 overflow-hidden rounded-xl">
                                <div className="size-20 bg-white/30 blur-2xl -top-5 -left-5 absolute rounded-full z-10"></div>
                                <div className="flex gap-2 items-center">
                                    <h1 className="font-extrabold text-2xl">{item.pricing} </h1>
                                    {item.plantype !== "Free Tier" && <h3 className="text-sm italic text-dark-text-muted">/ month</h3>}
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h1 className="text-base font-bold">{item.plantype}</h1>
                                    <p className="text-xs text-gray-600 italic">{item.plandesc}</p>
                                </div>
                                <hr className="dark:border-gray-600/30 border w-full" />
                                <div className="flex flex-col gap-3">
                                    {item.planadv.map((adv, idx) => {
                                        return <p key={idx} className="text-xs flex items-center gap-3"><CircleCheck className="size-4 text-emerald-600" />{adv.message}</p>
                                    })}
                                </div>
                                {session ? <button onClick={() => handlerazorpay(item.planid)} className={`rounded-md w-full font-extrabold transition-all duration-300 bg-white text-black p-2 hover:bg-white/90 cursor-pointer ${item.plantype === "Free Tier" && 'invisible'}`}>Subscribe</button> : <button onClick={() => { router.push("/Signup") }} className="rounded-md w-full font-extrabold transition-all duration-300 bg-white text-black p-2 hover:bg-white/90 cursor-pointer">Get Started</button>}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>

    )
}