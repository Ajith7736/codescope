"use client"

import DashContent from '@/features/dashboard/components/DashContent';
import { useSession } from '@/lib/auth-client'
import { redirect } from 'next/navigation';
import { useEffect } from 'react';


function page() {
  const { data: session } = useSession();


  return (
    <>

      <DashContent />
    </>
  )
}

export default page
