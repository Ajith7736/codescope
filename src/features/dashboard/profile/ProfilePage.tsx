"use client"


import { useSession } from "@/lib/auth-client";
import { ProfileCard } from "./ProfileCard";
import LinkedAccounts from "./LinkedAccounts";
import { providers } from "@/lib/Authproviders";
import UnlinkedAccounts from "./UnlinkedAccounts";
import CurrentPlan from "./CurrentPlan";
import Loading from "@/app/loading";
import DeleteUser from "./DeleteUser"


export default function ProfilePage() {

    const { data: session, refetch, isRefetching } = useSession();
    const currentprovider = new Set(session?.user?.accounts.map((item) => item.providerId))



    if (isRefetching) return <Loading />

    return <div className="overflow-auto p-5 flex flex-col xl:items-center w-full gap-5 ">
        <div className="flex xss:flex-col gap-4">

            <ProfileCard session={session} />

            <div className="text-[11px] text-indigo-400 gap-2 font-bold flex items-center"><h1>LINKED ACCOUNTS</h1> <span className="w-1 h-1 bg-indigo-400/60 rounded-full"></span></div>
            <div className="flex flex-col gap-4">
                {!currentprovider.has('google') && !currentprovider.has('github') ? <div className="text-xs text-gray-600">No social account linked</div> : session?.user?.accounts.map((item) => {
                    return item.providerId !== "credential" && <LinkedAccounts item={item} key={item.providerId} refetch={refetch} />
                })}
            </div>

            <div className="text-[11px] text-indigo-400 gap-2 font-bold flex items-center"><h1>LINK OTHER ACCOUNTS</h1> <span className="w-1 h-1 bg-indigo-400/60 rounded-full"></span></div>
            <div className="flex flex-col gap-4">
                {currentprovider.has('google') && currentprovider.has('github') ? <div className="text-xs text-gray-600">No socials to link</div> : [...providers.values()].map((item: string) => {
                    return !currentprovider.has(item) && <UnlinkedAccounts refetch={refetch} key={item} item={item} />
                })}
            </div>
        </div>


        <CurrentPlan subscription={{ planName: session?.subscription?.plan.name, activatedAt: session?.subscription?.activated_at, endAt: session?.user?.subscription_end_date, status: session?.user?.subscription_status }} />


        <DeleteUser />
    </div>
}