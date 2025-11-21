import Link from 'next/link'
import React from 'react'

function ActionText({ children , href }: { children: React.ReactNode , href: any}) {
    return (
        <Link href={href} className='xss:text-xs lg:text-sm text-purple-500 '>
            {children}
        </Link>
    )
}

export default ActionText
