"use client"

import Link from "next/link"


function error() {
    return (
        <div className='bg-light-white dark:bg-dark-black flex flex-col gap-3 items-center justify-center h-screen w-screen'>
            <div className='text-6xl font-bold text-red-400'>Oops!</div>
            <div className='text-light-textgray dark:text-dark-textgray text-center mx-10'>Something went wrong.</div>
            <Link href={"/"} className='bg-light-black dark:bg-dark-white px-4 py-2 rounded-xl hover:bg-light-hoverblack dark:hover:bg-dark-hoverwhite text-light-white dark:text-dark-black cursor-pointer font-bold'>Go to Homepage</Link>
        </div>
    )
}

export default error
