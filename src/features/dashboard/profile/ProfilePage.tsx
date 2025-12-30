"use client"


import { useSession } from "@/lib/auth-client";
import { Trash2, TriangleAlert } from "lucide-react";
import { ProfileCard } from "./ProfileCard";
import LinkedAccounts from "./LinkedAccounts";
import { providers } from "@/lib/Authproviders";
import UnlinkedAccounts from "./UnlinkedAccounts";
import CurrentPlan from "./CurrentPlan";
import { useState } from "react";
import Loading from "@/app/loading";


export default function ProfilePage() {

    const { data: session, refetch, isRefetching  } = useSession();
    const currentprovider = new Set(session?.user?.accounts.map((item) => item.providerId))



    if (isRefetching) return <Loading />

    return <div className="overflow-auto p-5 flex flex-col xl:items-center w-full gap-5 ">
        <div className="flex xss:flex-col gap-4">

            <ProfileCard session={session} />

            <div className="text-[11px] text-indigo-400 gap-2 font-bold flex items-center"><h1>LINKED ACCOUNTS</h1> <span className="w-1 h-1 bg-indigo-400/60 rounded-full"></span></div>
            <div className="flex flex-col gap-4">
                {!currentprovider.has('google') && !currentprovider.has('github') ? <div className="text-xs text-gray-600">No social account linked</div> : session?.user?.accounts.map((item) => {
                    return item.providerId !== "credentials" && <LinkedAccounts item={item} key={item.providerId} refetch={refetch} />
                })}
            </div>

            <div className="text-[11px] text-indigo-400 gap-2 font-bold flex items-center"><h1>LINK OTHER ACCOUNTS</h1> <span className="w-1 h-1 bg-indigo-400/60 rounded-full"></span></div>
            <div className="flex flex-col gap-4">
                {currentprovider.has('google') && currentprovider.has('github') ? <div className="text-xs text-gray-600">No socials to link</div> : [...providers.values()].map((item: string) => {
                    return !currentprovider.has(item) && <UnlinkedAccounts refetch={refetch} key={item} item={item} />
                })}
            </div>
        </div>


        <CurrentPlan subscription={{ planName: session?.subscription?.plan.name, activatedAt: session?.subscription?.activated_at, endAt: session?.user?.subscription_end_date ,status: session?.user?.subscription_status}} />


        <div className=" xl:w-[75vw] w-full">
            <div className="text-[10px] mb-5 text-red-500 gap-2 font-bold flex items-center"><h1>ACCOUNT SECURITY</h1> <span className="w-1 h-1 bg-red-400/60 rounded-full"></span></div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-[11px] text-sm p-5 text-red-500 xss:flex xss:flex-col md:flex-row md:justify-between md:items-center gap-5">
                <div className="flex gap-3">
                    <div className="bg-red-600/10 p-3 w-fit border border-red-500/20 rounded-md">
                        <TriangleAlert className="size-6" />
                    </div>
                    <div className="md:w-[30vw]">
                        <h3 className="font-bold">DELETE ACCOUNT</h3>
                        <p className="text-gray-500 text-[10px]">Permanently delete your account and all associated data. This action is irreversible and cannot be undone.</p>
                    </div>
                </div>
                <button className="xss:text-[12px] md:text-[9px] cursor-pointer hover:bg-red-600/10 transition-all duration-300 bg-red-600/5 py-3 px-5 border border-red-500/20  flex gap-3 justify-center items-center"><Trash2 className="size-4" />DELETE ACCOUNT PERMANENTLY</button>
            </div>
        </div>
    </div>
}