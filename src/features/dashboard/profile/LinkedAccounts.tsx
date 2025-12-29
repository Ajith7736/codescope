import Loading from '@/app/loading'
import { UnlinkAccount } from '@/lib/actions/auth-actions'
import SmallText from '@/ui/Text/SmallText'
import { Chrome, Github, Link2Off } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function LinkedAccounts({ item, refetch, isRefetching }: {
    item: {
        providerId: string,
        accountId: string,
        createdAt: Date
    },
    refetch: Function,
    isRefetching: boolean
}) {
    
    const router = useRouter();
    const handleunlink = async (providerId: string, accountId: string) => {
        const data = await UnlinkAccount(providerId, accountId);
        if (!data.success) {
            toast.error(data.message);
        }
        await refetch();
    }

    if (isRefetching) return <Loading />

    return (
        <div key={item.providerId} className="bg-dark-accent/10 p-4 flex justify-between items-center rounded-[11px]">
            <div className="flex gap-4 items-center">
                {item.providerId === "google" ?
                    <div className="bg-dark-accent/10 p-3 rounded-lg border border-dark-border">
                        <Chrome className="size-5" />
                    </div>

                    :
                    <div className="bg-dark-accent/10 p-3 rounded-lg border border-dark-border">
                        <Github className="size-5" />
                    </div>}
                <div className="flex flex-col gap-1">
                    <h1 className="text-sm font-semibold capitalize flex gap-2 items-center">{item.providerId} account <div className="text-[8px] text-emerald-600 bg-emerald-500/20 p-[3px] w-fit border">CONNECTED</div></h1>
                    <SmallText className="text-gray-500">Linked At : {item.createdAt.toLocaleDateString()}</SmallText>
                </div>
            </div>
            <button onClick={() => { handleunlink(item.providerId, item.accountId) }} className=" border border-red-400/40 cursor-pointer hover:text-red-600 hover:border-red-500/30 transition-all duration-300 text-red-400 text-[10px] py-2 rounded-lg px-5 flex gap-2 items-center"><Link2Off className="size-4 " />Unlink</button>
        </div>
    )
}

export default LinkedAccounts