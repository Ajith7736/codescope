import { cn } from '@/lib/utils'
import React from 'react'

function ProjectText({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn('xss:text-[12px] md:text-xs lg:text-sm font-extrabold ', className)}>
            {children}
        </div>
    )
}

export default ProjectText
