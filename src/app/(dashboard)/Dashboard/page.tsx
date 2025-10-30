"use client"
import Nav from '@/features/dashboard/components/Nav';
import Sidebar from '@/features/dashboard/components/Sidebar';
import { useSession } from '@/lib/auth-client'
import { PanelLeft } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useState } from 'react'

function page() {

  const { data: session } = useSession();
  const [showsidebar, setshowsidebar] = useState(false)

  if (!session) {
    redirect("/Signup")
  }

  const handlesidebar = () => {
    setshowsidebar(!showsidebar);
  }

  return (
    <div className='flex'>
      <Sidebar showsidebar={showsidebar} setshowsidebar={setshowsidebar} />
      <div className='bg-light-white flex flex-col dark:bg-dark-black md:flex-1 xss:w-full min-h-screen p-4'>
      <Nav handlesidebar={handlesidebar} />
      </div>
    </div>
  )
}

export default page
