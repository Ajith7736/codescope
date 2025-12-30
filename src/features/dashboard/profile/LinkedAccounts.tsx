import Loading from '@/app/loading'
import { UnlinkAccount } from '@/lib/actions/auth-actions'
import LinkLoader from '@/ui/loaders/LinkLoader'
import SmallText from '@/ui/Text/SmallText'
import { Chrome, Github, Link2Off } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

function LinkedAccounts({ item, refetch }: {
    item: {
        providerId: string,
        accountId: string,
        createdAt: Date
    },
    refetch: Function
}) {
    const [linking, setlinking] = useState<{
        show: boolean,
        provider: string
    } | null>(null);


    const handleunlink = async (providerId: string, accountId: string) => {
        try {
            setlinking({
                show: true,
                provider: providerId
            });
            const data = await UnlinkAccount(providerId, accountId);
            
            if (!data.success) {
                return toast.error(data.message);
            }

        } catch (err) {
            toast.error("Something went wrong")
        } finally {
            setlinking(null);
            await refetch();
        }
    }

    return (
        <div key={item.providerId} className="bg-dark-accent/10 p-4 flex justify-between items-center rounded-[11px] ">
            <div className="flex gap-4 items-center">
                {item.providerId === "google" ?
                    <div className="bg-dark-accent/10 p-3 rounded-lg border border-light-text-muted/20 dark:border-dark-border">
                        <Chrome className="size-5" />
                    </div>

                    :
                    <div className="bg-dark-accent/10 p-3 rounded-lg border border-light-text-muted/20 dark:border-dark-border">
                        <Github className="size-5" />
                    </div>}
                <div className="flex flex-col gap-1">
                    <h1 className="text-xs font-semibold capitalize flex gap-2 items-center">{item.providerId} account <div className="text-[8px] text-emerald-600 bg-emerald-500/20 p-[3px] w-fit border">CONNECTED</div></h1>
                    <p className="text-gray-500 text-[10px]">Linked At : {item.createdAt.toLocaleDateString()}</p>
                </div>
            </div>
            <button onClick={() => { handleunlink(item.providerId, item.accountId) }} className=" border border-red-600/50 cursor-pointer hover:text-red-600 hover:border-red-500/30 transition-all duration-300 text-red-400 text-[10px] py-2 w-22 justify-center flex gap-2 items-center">{linking?.show && linking.provider === item.providerId ? <LinkLoader type='Unlink' /> : <><Link2Off className="size-4 " />Unlink</>}</button>
        </div>
    )
}

export default LinkedAccounts