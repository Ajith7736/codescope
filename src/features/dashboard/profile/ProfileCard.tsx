import { auth } from "@/lib/auth"
import { Dot, Mail, ShieldCheck } from "lucide-react"
import Image from "next/image"

type Session = Awaited<ReturnType<typeof auth.api.getSession>>

export const ProfileCard = ({ session }: { session: Session }) => {

    return <div className="bg-linear-to-r from-dark-accent/10 via-dark-accent/0 to-dark-accent/10  xl:w-xl  py-5 px-12 items-center flex  flex-col gap-4 rounded-[13px]">
        <div className="relative">
            {session?.user?.image ?
                <Image
                    width={80}
                    height={80}
                    src={session?.user?.image}
                    alt="profile pic"
                /> : <div className="relative w-20 h-20 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-22 h-22 text-gray-400 -left-1 top-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>}
            <div className="bg-indigo-600 py-[5px] px-[5px] w-fit rounded-lg absolute bottom-0 right-0">
                <ShieldCheck size={15} />
            </div>
        </div>
        <div className="text-xs flex flex-col items-center gap-1">
            <div className="flex gap-2 items-center">
                <h1 className="text-lg font-bold font-sans">{session?.user?.name}</h1>
                <div>{session?.user?.subscription_status === "active" ? <div className="dark:bg-indigo-600/20 dark:text-indigo-600 border p-1 w-fit  font-extrabold">{session.subscription?.plan.name === "Basic" ? <>Basic</> : <>Pro</>}</div> : <div className="dark:bg-indigo-600/20 dark:text-indigo-600 border p-1 w-fit  font-extrabold">Free Tier</div>}</div>
            </div>
            <p className="flex gap-2 items-center text-[12px] text-dark-text-muted/50"><Mail size={16} className="text-indigo-600 " />{session?.user?.email}</p>
        </div>
        <div className="flex gap-4">
            <div className="flex flex-col items-center gap-2">
                <h4 className="text-[10px] text-dark-text-muted/50">MEMBER SINCE</h4>
                <p className="text-[10px] ">{session?.user?.createdAt.toLocaleDateString()}</p>
            </div>
            <hr className="border h-10 border-dark-border" />
            <div className="flex flex-col items-center gap-2">
                <h4 className="text-[10px] text-dark-text-muted/50">ACCOUNT STATUS</h4>
                <h4 className="text-[10px] text-emerald-500 flex items-center gap-2">active <span className="w-1 h-1 bg-emerald-500 rounded-full"></span></h4>
            </div>
        </div>
    </div>
}