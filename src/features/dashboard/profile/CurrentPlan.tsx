import SmallText from '@/ui/Text/SmallText'
import { ArrowUpRight, CreditCard } from 'lucide-react'


function CurrentPlan({ subscription }: {
    subscription: {
        planName: string | undefined | null,
        activatedAt: Date | undefined | null,
        endAt: Date | undefined | null,
        status: string | undefined | null
    } | null
}) {
    return (
        <div className="xl:w-[75vw] w-full">
            <div className="text-[11px] mb-5 text-indigo-400 gap-2 font-bold flex items-center"><h1>CURRENT SUBSCRIPTION</h1> <span className="w-1 h-1 bg-indigo-400/60 rounded-full"></span></div>

            {subscription?.status === "active" ? <div className="bg-dark-accent/10 p-5 border border-dark-accent/20 rounded-[11px] xss:flex xss:flex-col xss:gap-3 lg:flex-row lg:justify-between lg:items-center">
                <div className="flex gap-3">
                    <div className="text-sm bg-indigo-400/10 p-3 w-fit rounded-[14px] text-indigo-400/20 border">
                        <CreditCard className="text-indigo-400  " />
                    </div>
                    <div>
                        <h1 className="font-extrabold flex gap-2 items-center">{subscription?.planName} <div className="text-[8px] text-indigo-600 bg-indigo-500/20 p-[3px] w-fit border">CURRENT</div></h1>
                        <div className="flex gap-2 items-center">
                            <SmallText className="text-gray-500">Activation : {subscription?.activatedAt?.toLocaleDateString()}</SmallText>
                            <span className="w-1 h-1 bg-indigo-400/60 rounded-full"></span>
                            <SmallText className="text-gray-500">Next Billing At : {subscription?.endAt ? subscription?.endAt?.toLocaleDateString() : <>not available</>}</SmallText>
                        </div>
                    </div>

                </div>
                <div>
                    <button className="bg-indigo-600 transition-all duration-300 hover:bg-indigo-700 cursor-pointer flex gap-3 items-center py-2 px-9 rounded-md text-[12px] font-extrabold text-white">Upgrade Plan <ArrowUpRight className="size-4" /></button>
                </div>
            </div> : <div className="text-xs text-gray-600 italic bg-dark-accent/10 p-5 rounded-md border border-light-accent/20 dark:border-dark-border">No Active Plans</div>}
        </div>
    )
}

export default CurrentPlan