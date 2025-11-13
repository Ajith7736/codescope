"use client"
import Nav from '@/features/dashboard/components/Nav'
import Sidebar from '@/features/dashboard/components/Sidebar'
import React, { useState } from 'react'

function ClientLayout({ children }: { children: React.ReactNode }) {
    const [showsidebar, setshowsidebar] = useState<boolean>(false)

    return (
        <div className='flex min-h-screen'>
            <Sidebar showsidebar={showsidebar} setshowsidebar={setshowsidebar} />
            <div className='bg-light-white flex flex-col dark:bg-dark-black md:flex-1 xss:w-full max-h-screen '>
                <Nav handlesidebar={() => setshowsidebar(!showsidebar)} />
                {children}
            </div>
        </div>
    )
}

export default ClientLayout
