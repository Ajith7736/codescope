import { cn } from '@/lib/utils'
import React from 'react'

function RiskText({ variant , children}: { variant: "high" | "medium" | "low" , children : React.ReactNode}) {

    const variants = {
        low: "bg-blue-500/10 border border-blue-500/30 text-blue-500",
        medium: "bg-orange-500/10 border border-orange-500/30 text-orange-500",
        high: "bg-red-500/10 border border-red-500/30 text-red-500"
    }

    return (
        <div className={cn(`text-[9px] w-10 h-5 flex items-center justify-center capitalize`,variants[variant])}>{children}</div>
    )
}

export default RiskText