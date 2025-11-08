import React from 'react'

function StatusText({ variant }: { variant: "healthy" | "warning" | "excellent" }) {

    const variants = {
        healthy: "bg-blue-500/30 text-blue-600",
        warning: "bg-orange-500/30 text-orange-600",
        excellent: "bg-green-500/30 text-green-600",
        critical: "bg-red-500/30 text-red-600"
    }

    return (
        <p className={`${variants[variant]} xss:text-xs lg:text-sm  py-1 px-2 rounded-full`}>
            {variant}
        </p>
    )
}

export default StatusText