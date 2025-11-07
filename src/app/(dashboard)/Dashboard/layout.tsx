"use client"
import Loading from "@/app/loading";
import Nav from "@/features/dashboard/components/Nav";
import Sidebar from "@/features/dashboard/components/Sidebar";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isclient, setisclient] = useState(false);
    const [showsidebar, setshowsidebar] = useState(false)


    useEffect(() => {
        setisclient(true)
    }, [])

    if (!isclient) return <Loading />;

    return <div className='flex min-h-screen'>
        <Sidebar showsidebar={showsidebar} setshowsidebar={setshowsidebar} />
        <div className='bg-light-white flex flex-col dark:bg-dark-black md:flex-1 xss:w-full max-h-screen gap-5'>
            <Nav handlesidebar={() => setshowsidebar(!showsidebar)} />
            {children}
        </div>
    </div>
}