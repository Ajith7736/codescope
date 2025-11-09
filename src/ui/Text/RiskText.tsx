import React from 'react'

function RiskText({ variant , children}: { variant: "healthy" | "warning" | "excellent" , children : React.ReactNode}) {

    const variants = {
        healthy: "bg-blue-500/30 text-blue-600",
        warning: "bg-orange-500/30 text-orange-600",
        excellent: "bg-green-500/30 text-green-600",
        critical: "bg-red-500/30 text-red-600"
    }

    return (
        <p className={`${variants[variant]} w-fit xss:text-xs lg:text-sm  py-1 px-2 rounded-full`}>
            {children}
        </p>
    )
}

export default RiskText