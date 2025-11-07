import React from 'react'

function StatusText({ variant }: { variant: "healthy" | "warning" | "excellent" }) {

    const variants = {
        healthy: "bg-blue-500/40 text-blue-400",
        warning: "bg-orange-500/40 text-orange-400",
        excellent: "bg-green-500/40 text-green-400",
        critical: "bg-red-500/40 text-red-400"
    }

    return (
        <p className={`${variants[variant]} xss:text-xs lg:text-sm  py-1 px-2 rounded-full`}>
            {variant}
        </p>
    )
}

export default StatusText