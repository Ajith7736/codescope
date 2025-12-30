"use client"
import { motion } from "motion/react"
import { signOut } from '@/lib/actions/auth-actions';
import { useSession } from '@/lib/auth-client';
import Link from "next/link";
import Image from "next/image";
import { CreditCard, LogOut, User } from "lucide-react";
import React, { useState } from "react";
import Loading from "@/app/loading";
import { useSidebar } from "@/context/SidebarProvider";
import { usePathname } from "next/navigation";


function UserBlock({ setshowuserblock }: { setshowuserblock: React.Dispatch<React.SetStateAction<boolean>> }) {

    const { refetch } = useSession();
    const [isloading, setisloading] = useState<boolean>(false);
    const params = usePathname();
    const { setshowsidebar } = useSidebar();

    const handlelogout = async () => {
        setisloading(true);
        await signOut();
        await refetch();
        setisloading(false);
    }
    const { data: session } = useSession();

    if (isloading) {
        return <Loading />
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='transition-all duration-300 bg-light-surface dark:bg-dark-surface rounded-md border shadow-md border-light-border dark:border-dark-border p-1 w-fit xss:text-xs md:text-sm flex flex-col items-start gap-1'>
            <div className="p-2 w-full items-center hover:bg-dark-accent/10 flex flex-row gap-3">
                {session?.user?.image ?
                    <Image
                        height={15}
                        width={15}
                        src={session?.user?.image}
                        alt="profile pic"
                        className='rounded-full size-6.5'
                    />
                    :
                    <div>
                        <div className="relative w-8 h-8 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
                            <svg className="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </div>
                    </div>}
                <div className="flex flex-col items-start">
                    <p>{session?.user?.name}</p>
                    <p className="text-[12px]">{session?.user?.email}</p>
                </div>
            </div>

            <Link href={'/Dashboard/Profile'} className={` py-3 px-2 text-xs cursor-pointer  w-full flex gap-2  text-start ${params === "/Dashboard/Profile" ? "text-light-text-on-hover dark:text-dark-text-on-hover" : "text-dark-text-muted hover:text-light-text-on-hover hover:dark:text-dark-text-on-hover transition-all duration-300  hover:bg-dark-accent/10"}`} onClick={() => {
                setshowsidebar(false)
                setshowuserblock(false)
            }}><User className="size-4" />Profile</Link>
            <Link href={'/Billing'} className="py-3 px-2 text-xs cursor-pointer text-dark-text-muted hover:text-light-text-on-hover hover:dark:text-dark-text-on-hover transition-all duration-300  hover:bg-dark-accent/10 w-full flex gap-2  text-start"><CreditCard className="size-4" />Billing</Link>
            <hr className="border border-light-border dark:border-dark-border w-full"/>
            <div className='py-3 px-2 cursor-pointer text-xs w-full text-dark-text-muted hover:text-red-400 transition-all duration-300  hover:bg-dark-accent/10 flex gap-2 text-start' onClick={handlelogout}><LogOut className="size-4" />Logout</div>
        </motion.div >
    )
}

export default UserBlock
