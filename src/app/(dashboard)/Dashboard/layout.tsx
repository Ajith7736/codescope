"use client"
import Loading from "@/app/loading";
import Nav from "@/features/dashboard/components/Nav";
import Sidebar from "@/features/dashboard/components/Sidebar";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isclient, setisclient] = useState(false);
    const [showsidebar, setshowsidebar] = useState(false)
    const { data: session} = useSession();



    useEffect(() => {
        setisclient(true)
    }, [])

    useEffect(() => {
        if (!session) {
            redirect("/Signup");
        }
    }, [session])

    if (!isclient) return <Loading />;

    return <div className='flex min-h-screen'>
        <Sidebar showsidebar={showsidebar} setshowsidebar={setshowsidebar} />
        <div className='bg-light-white outline-none flex flex-col dark:bg-dark-black md:flex-1 xss:w-full max-h-screen '>
            <Nav handlesidebar={() => setshowsidebar(!showsidebar)} />
            {children}
        </div>
    </div>
}