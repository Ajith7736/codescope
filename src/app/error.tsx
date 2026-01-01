"use client"

import Link from "next/link"
import { useSession } from "@/lib/auth-client"

function ErrorPage() {
    const {data : session} = useSession();

    return (
        <div className='bg-light-white dark:bg-dark-black flex flex-col gap-3 items-center justify-center min-h-dvh w-screen'>
            <div className='text-6xl font-bold text-red-400'>Oops!</div>
            <div className='text-light-textgray dark:text-dark-textgray text-center mx-10'>Something went wrong.</div>
            {session ? <Link
                href={"/Dashboard"}
                className='bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-[7px] transition-all duration-300 text-white cursor-pointer font-bold'>
                Go to Dashboard
            </Link> :
                <Link
                    href={"/"}
                    className='bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-[7px] transition-all duration-300 text-white cursor-pointer font-bold'>
                    Go to Homepage
                </Link>}
        </div>
    )
}

export default ErrorPage
