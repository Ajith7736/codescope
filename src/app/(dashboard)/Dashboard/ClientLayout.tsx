"use client"
import { useSidebar } from '@/context/SidebarProvider'
import Nav from '@/features/dashboard/components/Nav'
import Sidebar from '@/features/dashboard/components/Sidebar'
import React from 'react'

function ClientLayout({ children }: { children: React.ReactNode }) {
    const { setshowsidebar, showsidebar } = useSidebar();

    return (
        <div className='flex min-h-dvh'>
            <Sidebar />
            <div className=' flex xss:flex-col xss:w-full md:flex-1  max-h-dvh '>
                <Nav handlesidebar={() => setshowsidebar(!showsidebar)} />
                {children}
            </div>
        </div>
    )
}

export default ClientLayout
