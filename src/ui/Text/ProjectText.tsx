import { cn } from '@/lib/utils'
import React from 'react'

function ProjectText({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn('xss:text-base lg:text-base font-bold ', className)}>
            {children}
        </div>
    )
}

export default ProjectText
