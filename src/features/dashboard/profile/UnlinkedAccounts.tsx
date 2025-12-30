import { authClient } from '@/lib/auth-client';
import LinkLoader from '@/ui/loaders/LinkLoader';
import SmallText from '@/ui/Text/SmallText'
import { Chrome, Github, Plus } from 'lucide-react'
import { useState } from 'react';
import { toast } from 'sonner';

function UnlinkedAccounts({ item, refetch }: { item: string, refetch: Function }) {
    const [linking, setlinking] = useState<{
        show: boolean,
        provider: string
    } | null>(null);

    const handlelink = async (provider: string) => {
        try {
            setlinking({
                provider,
                show: true
            })
            const { error } = await authClient.linkSocial({
                provider,
                callbackURL : "/Dashboard/Profile",
            })
            if (error) {
                return toast.error(error.message)
            }

        } catch (err) {
            toast.error("Something went wrong")
        } finally {
            setlinking(null);
            await refetch();
        }
    }

    return (
        <div key={item} className="bg-dark-accent/10  p-4 flex gap-3 justify-between items-center rounded-[11px]">
            <div className="flex gap-4 items-center">
                {item === "google" ?
                    <div className="bg-dark-accent/10 p-3 rounded-md border border-dark-text-muted/20 dark:border-dark-border">
                        <Chrome className="size-5" />
                    </div>

                    :
                    <div className="bg-dark-accent/10 p-3 rounded-md border border-dark-text-muted/20 dark:border-dark-border">
                        <Github className="size-5" />
                    </div>}
                <div className="flex flex-col gap-1">
                    <h1 className="text-sm font-semibold capitalize flex gap-2">{item}</h1>
                    <SmallText className="text-gray-500">Connect your account for easier sign-in and code sync</SmallText>
                </div>
            </div>
            <button onClick={() => handlelink(item)} className=" border border-indigo-500/40 cursor-pointer hover:text-indigo-600 hover:border-indigo-500/30 transition-all duration-300 text-indigo-400 text-[10px] py-2 w-22 justify-center flex gap-2 items-center">{linking?.show && linking?.provider === item ? <LinkLoader type='Link' /> : <><Plus className="size-4 " />Link</>}</button>
        </div>
    )
}

export default UnlinkedAccounts