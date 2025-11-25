"use client"
import { useSidebar } from '@/context/SidebarProvider'
import Nav from '@/features/dashboard/components/Nav'
import Sidebar from '@/features/dashboard/components/Sidebar'
import React, { useState } from 'react'

function ClientLayout({ children }: { children: React.ReactNode }) {
    const { setshowsidebar, showsidebar } = useSidebar();

    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='bg-light-white flex xss:flex-col xss:w-full dark:bg-dark-black md:flex-1  max-h-screen '>
                <Nav handlesidebar={() => setshowsidebar(!showsidebar)} />
                {children}
            </div>
        </div>
    )
}

export default ClientLayout
