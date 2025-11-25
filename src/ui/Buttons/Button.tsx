import React from 'react'

function Button({ variant = "default", icons, children , onClick }: { variant?: "default" | "blue", icons?: React.ReactElement, children: React.ReactNode , onClick?: () => void}) {


    const variants = {
        default: "bg-light-black cursor-pointer hover:bg-light-hoverblack dark:hover:bg-dark-text-primary dark:bg-dark-text-on-hover text-white dark:text-black",
        blue : "bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white"
    }

    return (
        <button onClick={onClick && onClick} className={`${variants[variant]} p-2 rounded-md xss:text-sm flex items-center gap-2 w-36 justify-center transition-all duration-300`}>{icons} {children}</button>
    )
}

export default Button
