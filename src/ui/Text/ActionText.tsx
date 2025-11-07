import Link from 'next/link'
import React from 'react'

function ActionText({ children }: { children: React.ReactNode }) {
    return (
        <Link href="/Dashboard" className='xss:text-xs lg:text-sm text-purple-500 '>
            {children}
        </Link>
    )
}

export default ActionText
