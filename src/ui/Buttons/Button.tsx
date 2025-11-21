import React from 'react'

function Button({ variant = "default", icons, children , onClick }: { variant?: "default" | "purple", icons?: React.ReactElement, children: React.ReactNode , onClick?: () => void}) {


    const variants = {
        default: "bg-light-black cursor-pointer hover:bg-light-hoverblack dark:hover:bg-dark-hoverwhite dark:bg-dark-white text-white dark:text-black",
        purple : "bg-purple-500 dark:bg-purple-700 cursor-pointer hover:bg-purple-500/90 hover:bg-purple-800 text-white"
    }

    return (
        <button onClick={onClick && onClick} className={`${variants[variant]} p-2 rounded-md xss:text-sm flex items-center gap-2 w-36 justify-center transition-all duration-300`}>{icons} {children}</button>
    )
}

export default Button
