import { authClient } from '@/lib/auth-client';
import SmallText from '@/ui/Text/SmallText'
import { Chrome, Github, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function UnlinkedAccounts({ item }: { item: string }) {
    const router = useRouter();
    const handlelink = async (provider: string) => {
        const { error } = await authClient.linkSocial({
            provider,
            callbackURL: "/Dashboard/Profile"
        })
        if (error) {
            return toast.error(error.message)
        }
        await router.refresh();
    }

    return (
        <div key={item} className="bg-dark-accent/10  p-4 flex gap-3 justify-between items-center rounded-[11px]">
            <div className="flex gap-4 items-center">
                {item === "google" ?
                    <div className="bg-dark-accent/10 p-3 rounded-lg border border-dark-border">
                        <Chrome className="size-5" />
                    </div>

                    :
                    <div className="bg-dark-accent/10 p-3 rounded-lg border border-dark-border">
                        <Github className="size-5" />
                    </div>}
                <div className="flex flex-col gap-1">
                    <h1 className="text-sm font-semibold capitalize flex gap-2">{item}</h1>
                    <SmallText className="text-gray-500">Connect your account for easier sign-in and code sync</SmallText>
                </div>
            </div>
            <button onClick={() => handlelink(item)} className=" border border-indigo-500/40 cursor-pointer hover:text-indigo-600 hover:border-indigo-500/30 transition-all duration-300 text-indigo-400 text-[10px] py-2 rounded-lg px-5 flex gap-2 items-center"><Plus className="size-4 " />Link</button>
        </div>
    )
}

export default UnlinkedAccounts