import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

function Container({ className, children }: { className?: string, children: ReactNode }) {
    return (
        <div className={cn("max-w-7xl mx-auto xss:px-3", className)}>
            {children}
        </div>
    )
}

export default Container
