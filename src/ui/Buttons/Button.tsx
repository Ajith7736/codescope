import React from 'react'

function Button({ variant = "default", icons, children , onClick }: { variant?: "default", icons?: React.ReactElement, children: React.ReactNode , onClick?: () => void}) {

    const variants = {
        default: "bg-light-black cursor-pointer hover:bg-light-hoverblack dark:hover:bg-dark-hoverwhite dark:bg-dark-white text-white dark:text-black"
    }

    return (
        <button onClick={onClick && onClick} className={`${variants[variant]} p-2 rounded-md xss:text-sm flex items-center gap-2 w-36 justify-center`}>{icons} {children}</button>
    )
}

export default Button
