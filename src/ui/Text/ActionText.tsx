import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

function ActionText({ children, href, className }: { className?: string, children: React.ReactNode, href: any }) {
    return (
        <Link href={href} className={cn('xss:text-xs lg:text-sm text-indigo-600',className)}>
            {children}
        </Link>
    )
}

export default ActionText
