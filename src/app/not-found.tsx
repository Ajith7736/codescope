"use client"
import { useSession } from '@/lib/auth-client'
import Link from 'next/link'

function Notfound() {

    const { data: session } = useSession();

    return (
        <div className='bg-light-background dark:bg-dark-background flex flex-col gap-3 items-center justify-center h-screen w-screen'>
            <div className='text-6xl font-bold'>404</div>
            <div className='text-light-text-muted dark:text-dark-textgray text-sm text-center mx-10'>Oops, it looks like the page you're looking for doesn't exist.</div>
            <Link href={"/"} className='bg-indigo-500 px-4 py-2 rounded-sm hover:bg-indigo-600  text-white cursor-pointer font-bold'>Go to Homepage</Link>
        </div>
    )
}

export default Notfound