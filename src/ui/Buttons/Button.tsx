import { cn } from '@/lib/utils'
import React from 'react'

function Button({ variant = "default", icons, children, onClick, className }: { variant?: "default" | "blue", icons?: React.ReactElement, children: React.ReactNode, onClick?: () => void, className?: string }) {


    const variants = {
        default: "bg-light-black cursor-pointer hover:bg-light-hoverblack dark:hover:bg-dark-text-primary dark:bg-dark-text-on-hover text-white dark:text-black",
        blue: "bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white"
    }


    return (
        <button onClick={onClick} className={cn(className,`${variants[variant]} p-2 rounded-md xss:text-[11px] md:text-xs flex items-center gap-2  justify-center transition-all duration-300 tracking-widest font-family-sans font-bold `)}>{icons} {children}</button>
    )
}

export default Button
