import React from 'react'

function RiskText({ variant , children}: { variant: "high" | "medium" | "low" , children : React.ReactNode}) {

    const variants = {
        low: "bg-blue-500/30 text-blue-600",
        medium: "bg-orange-500/30 text-orange-600",
        high: "bg-red-500/30 text-red-600"
    }

    return (
        <p className={`${variants[variant]} w-fit xss:text-xs lg:text-sm  py-1 px-2 rounded-full`}>
            {children}
        </p>
    )
}

export default RiskText