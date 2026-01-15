import { cn } from '@/lib/utils'
import React from 'react'

function SecondTitle({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn(`xss:text-base lg:text-xl font-extrabold tracking-widest`, className)}>
            {children}
        </div>
    )
}

export default SecondTitle
