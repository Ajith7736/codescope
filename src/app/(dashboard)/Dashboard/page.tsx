"use client"

import DashContent from '@/features/dashboard/components/DashContent';
import { useSession } from '@/lib/auth-client'
import { redirect } from 'next/navigation';


function page() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/Signup")
  }


  return (
    <>
    
      <DashContent />
    </>
  )
}

export default page
