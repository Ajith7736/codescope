"use client"
import Loading from "@/app/loading"
import { useSession } from "@/lib/auth-client"
import { delay } from "@/lib/delay"
import { createsubscription, verifypayment } from "@/lib/server/api/razorpay"
import { PlanProps, razorProps } from "@/types/type"
import ButtonLoader from "@/ui/loaders/ButtonLoader"
import { VerificationLoader } from "@/ui/loaders/VerificationLoader"
import { useQuery } from "@tanstack/react-query"
import { CircleCheck, CircleX, Lock, MoveLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { useState } from "react"
import { toast } from "sonner"

export const PricingContent = () => {
    const { data: session, isPending, refetch, isRefetching } = useSession();
    const [verifying, setverifying] = useState<boolean>(false);
    const [issubscribe, setissubscribe] = useState<{
        planId: string | undefined | null,
        show: boolean
    }>({
        planId: null,
        show: true
    });
    const router = useRouter();

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
                toast.error(data.message);
                throw new Error(data.message);
            }

            return data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    })

    const plans: PlanProps[] = data?.plans ? data?.plans : null;



    const handlerazorpay = async (planId: string | undefined) => {
        try {
            setissubscribe({
                planId,
                show: true
            });
            const data: razorProps = await createsubscription(planId, session?.user?.id);

            if (data.success) {
                setverifying(true);
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
                        name: session?.user?.name,
                        email: session?.user?.email,
                    },
                    handler: async function (response: any) {
                        await refetch();
                    },
                });

                rzp.open();
            }
        } catch (err) {
            console.error(err);
            toast.error("Server Error");
        } finally {
            setverifying(false);
            setissubscribe({
                planId: null,
                show: false
            });
        }

    }

    if (isLoading || isPending || isRefetching) return <Loading />


    if (verifying) return <VerificationLoader />



    return (
        <div className="py-5 min-h-screen relative">
            <div className="h-20 w-20 bg-indigo-600 invisible dark:visible rounded-full blur-3xl absolute top-0 -left-10"></div>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <div className="mx-5 w-fit">
                <Link href={session ? "/Dashboard" : "/"} className="flex gap-3 items-center hover:dark:bg-dark-surface hover:bg-light-surface transition-all duration-300 p-3 text-sm rounded-md"><MoveLeft className="size-4" /><span>Back</span></Link>
            </div>
            <div className="flex flex-col items-center gap-10 px-5">
                <h1 className="xss:text-3xl md:text-4xl font-extrabold">BILLING</h1>
                <h3 className="text-xs text-light-text-muted dark:text-dark-text-primary">Manage your subscription and billing settings. Choose the plan that best fits your development needs.</h3>
                <div className="flex xss:flex-col md:flex-row md:flex-wrap w-full md:h-[60vh] md:items-center md:justify-center gap-8">
                    {plans?.map((item, index) => {
                        return <div key={index} className={`${(session?.subscription?.planId === item.razorpayPlanId
                            &&
                            session
                            &&
                            session?.user?.subscription_status === "active") ? 'dark:bg-white/50 bg-black/30 p-px' : 'conic'} relative dark:p-px rounded-xl xss:w-full md:w-[70%] lg:w-[30%]`}>
                            {(
                                session?.subscription?.planId === item.razorpayPlanId
                                &&
                                session
                                &&
                                session?.user?.subscription_status === "active"
                            )
                                &&
                                <div className="dark:bg-white bg-light-surface-hover w-fit text-dark-background  px-5 py-[4px] rounded-full text-[12px] font-extrabold absolute flex items-center justify-center -top-[10px] z-10 left-2">CURRENT PLAN</div>}
                            <div className="dark:bg-black bg-light-surface border border-light-border dark:border-none shadow-lg flex flex-col items-baseline gap-5 w-full h-[60vh] justify-between relative p-8 overflow-hidden rounded-xl">
                                <div className="size-20 dark:bg-white/30 bg-light-accent/20 blur-2xl -top-5 -left-5 absolute rounded-full z-10"></div>
                                <div className="flex gap-2 items-center">
                                    <h1 className="font-extrabold text-2xl">{item.currency === "USD" ? '$' : '₹'}{item.price} </h1>
                                    {item.name !== "Free Tier" && <h3 className="text-sm italic dark:text-dark-text-primary">/ month</h3>}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h1 className="text-base font-bold">{item.name}</h1>
                                    <p className="xss:text-[11px] md:text-xs text-light-accent dark:text-dark-text-primary italic">{item.description}</p>
                                </div>
                                <hr className="dark:border-gray-800 border-light-accent border w-full" />
                                <div className="flex flex-col gap-3">
                                    {item.features.map((feature, idx) => {
                                        return <div
                                            key={idx}>
                                            {(feature === "AI Repo Overview" && item.name === "Free Tier") ?
                                                <div className="xss:text-[10px] lg:text-xs flex items-center gap-3">
                                                    <CircleX className="size-4 text-red-600"  />
                                                    <p className="text-gray-600">{feature}</p>
                                                </div>
                                                : <div className="xss:text-[10px] lg:text-xs flex items-center  gap-3">
                                                    <CircleCheck className="size-4 text-emerald-600" />
                                                    <p>{feature}</p>
                                                </div>
                                            }</div>
                                    })}
                                </div>
                                {session ? <button onClick={() => handlerazorpay(item.razorpayPlanId)} className={`rounded-md w-full font-extrabold transition-all duration-300 dark:bg-white bg-black text-white dark:text-black p-2 hover:dark:bg-white/90 hover:bg-black/80  flex items-center h-10 justify-center cursor-pointer ${(item.name === "Free Tier" || session.subscription?.planId === item.razorpayPlanId) && 'invisible'}`}> {(issubscribe.planId === item.razorpayPlanId && issubscribe.show) ? <ButtonLoader variant="black" /> : <>Subscribe</>}</button> : <button onClick={() => { router.push("/Signup") }} className="rounded-md w-full font-extrabold transition-all duration-300 dark:bg-white bg-black text-white dark:text-black p-2 hover:dark:bg-white/90 hover:bg-black/80  cursor-pointer">Get Started</button>}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>

    )
}