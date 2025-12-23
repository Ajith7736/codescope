"use client"
import Loading from "@/app/loading"
import { useSession } from "@/lib/auth-client"
import { delay } from "@/lib/delay"
import { createsubscription, verifypayment } from "@/lib/server/api/razorpay"
import { PlanProps, razorProps } from "@/types/type"
import ButtonLoader from "@/ui/loaders/ButtonLoader"
import { VerificationLoader } from "@/ui/loaders/VerificationLoader"
import { useQuery } from "@tanstack/react-query"
import { CircleCheck, MoveLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const PricingContent = () => {
    const { data: session, isPending } = useSession();
    const [verifying, setverifying] = useState<boolean>(false);
    const [issubscribe, setissubscribe] = useState(false);
    const router = useRouter();
    const [plans, setplans] = useState<PlanProps[] | null>(null);

    const { data, isLoading } = useQuery({
        queryKey: ["plans"],
        queryFn: async () => {
            const res = await fetch("/api/fetch-plans", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json();

            if (!res.ok) {
                return toast.error(data.message)
            }

            return data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    })

    useEffect(() => {
        if (data?.success) {
            setplans(data.plans)
        }
    }, [data])

    const currentplan = "Free Tier";


    const handlerazorpay = async (planId: string | undefined) => {
        setissubscribe(true);
        const data: razorProps = await createsubscription(planId, session?.user.id);

        if (!(window as any).Razorpay) {
            console.error("Razorpay SDK not loaded");
            return;
        }

        const rzp = new (window as any).Razorpay({
            key: data.key,
            subscription_id: data.id,
            name: "CodeScope",
            description: "Monthly Subscription",
            prefill: {
                name: session?.user.name,
                email: session?.user.email,
            },
            theme: {
                color: "#000000",
            },
            handler: async function (response: any) {
                const data = await verifypayment(response.razorpay_payment_id, response.razorpay_signature, response.razorpay_subscription_id);
                setverifying(true);
                await delay(4000);
                if (!data.success) {
                    toast.error(data.message)
                } else {
                    toast.success(data.message)
                }
                setverifying(false);
                setissubscribe(false);
            },
        });

        rzp.open();

    }

    if (isLoading || isPending) return <Loading />


    if (verifying) return <VerificationLoader />


    return (
        <div className="py-5 min-h-screen">
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <div className="mx-5 w-fit">
                <Link href={session ? "/Dashboard" : "/"} className="flex gap-3 items-center hover:dark:bg-dark-surface hover:bg-light-surface transition-all duration-300 p-3 text-sm rounded-md"><MoveLeft className="size-4" /><span>Back</span></Link>
            </div>
            <div className="flex flex-col items-center gap-10 px-5">
                <h1 className="text-3xl font-extrabold">Billing</h1>
                <div className="flex xss:flex-col md:flex-row md:flex-wrap w-full md:h-[60vh] md:items-center md:justify-center gap-8">
                    {plans?.map((item, index) => {
                        return <div key={index} className={`${currentplan === item.name && session ? 'dark:bg-white/50 bg-black/30' : 'conic'} relative p-px rounded-xl xss:w-full md:w-[70%] lg:w-[30%]`}>
                            {currentplan === item.name && session && <div className="dark:bg-white bg-light-surface-hover w-fit text-dark-background  px-3 py-[2px] rounded-t-md text-[10px] font-extrabold absolute flex items-center justify-center -top-[19px] left-2">Current Plan</div>}
                            <div className="dark:bg-black bg-gray-400/20 shadow-lg flex flex-col items-baseline gap-5 w-full h-[60vh] justify-between relative p-5 overflow-hidden rounded-xl">
                                <div className="size-20 dark:bg-white/30 bg-light-accent/20 blur-2xl -top-5 -left-5 absolute rounded-full z-10"></div>
                                <div className="flex gap-2 items-center">
                                    <h1 className="font-extrabold text-2xl">{item.currency === "USD" ? '$' : '₹'}{item.price} </h1>
                                    {item.name !== "Free Tier" && <h3 className="text-sm italic dark:text-dark-text-primary">/ month</h3>}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h1 className="text-base font-bold">{item.name}</h1>
                                    <p className="xss:text-[11px] md:text-xs text-light-accent dark:text-dark-text-primary italic">{item.description}</p>
                                </div>
                                <hr className="dark:border-dark-text-primary/30 border-light-accent border w-full" />
                                <div className="flex flex-col gap-3">
                                    {item.features.map((feature, idx) => {
                                        return <p key={idx} className="xss:text-[10px] lg:text-xs flex items-center gap-3"><CircleCheck className="size-4 text-emerald-600" />{feature}</p>
                                    })}
                                </div>
                                {session ? <button onClick={() => handlerazorpay(item.razorpayPlanId)} className={`rounded-md w-full font-extrabold transition-all duration-300 dark:bg-white bg-black text-white dark:text-black p-2 hover:dark:bg-white/90 hover:bg-black/80  flex items-center justify-center cursor-pointer ${item.name === "Free Tier" && 'invisible'}`}> {issubscribe ? <ButtonLoader variant="black" /> : <>Subscribe</>}</button> : <button onClick={() => { router.push("/Signup") }} className="rounded-md w-full font-extrabold transition-all duration-300 dark:bg-white bg-black text-white dark:text-black p-2 hover:dark:bg-white/90 hover:bg-black/80  cursor-pointer">Get Started</button>}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>

    )
}