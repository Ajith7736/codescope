"use client"
import { usePage } from '@/context/PageProvider';
import AnalysisContent from '@/features/analysis/components/AnalysisContent';
import DashContent from '@/features/dashboard/components/DashContent';
import Nav from '@/features/dashboard/components/Nav';
import Sidebar from '@/features/dashboard/components/Sidebar';
import ProjectContent from '@/features/projects/components/ProjectContent';
import { useSession } from '@/lib/auth-client'
import { redirect } from 'next/navigation';
import { Activity, useState } from 'react'

function page() {

  const { data: session } = useSession();
  const [showsidebar, setshowsidebar] = useState(false)
  const { currentpage, setcurrentpage } = usePage();

  if (!session) {
    redirect("/Signup")
  }

  const handlesidebar = () => {
    setshowsidebar(!showsidebar);
  }



  return (
    <div className='flex min-h-screen'>
      <Sidebar showsidebar={showsidebar} setshowsidebar={setshowsidebar} />
      <div className='bg-light-white flex flex-col dark:bg-dark-black md:flex-1 xss:w-full max-h-screen gap-5'>
        <Nav handlesidebar={handlesidebar} />
        <Activity mode={currentpage === "dashboard" ? 'visible' : 'hidden'}>
          <DashContent />
        </Activity>
        <Activity mode={currentpage === "analysis" ? 'visible' : 'hidden'}>
          <AnalysisContent />
        </Activity>
        <Activity mode={currentpage === "projects" ? 'visible' : 'hidden'}>
          <ProjectContent />
        </Activity>
      </div>
    </div>
  )
}

export default page
