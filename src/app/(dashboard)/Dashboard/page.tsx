"use client"
import { useSession } from '@/lib/auth-client'
import React from 'react'

function page() {

  const { data: session } = useSession();
 

  return (
    <div>
      Dashboard
    </div>
  )
}

export default page
