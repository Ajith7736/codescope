import Container from '@/ui/container'
import { Code } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <div className='md:px-20 overflow-hidden bg-light-surface relative dark:bg-dark-border/30 border-t border-light-border dark:border-dark-border  p-5 w-full flex justify-between'>
                <Link href={"/"} className='text-2xl xss:text-lg flex items-center gap-3 font-extrabold'><span><Code size={20} className='bg-indigo-600 p-1 rounded-[3px] text-white h-7 w-7' strokeWidth={3} /></span>CodeScope AI</Link>
                <div className='flex flex-row gap-3 text-light-text-on-hover dark:text-dark-text-on-hover items-center'>
                    <ul className='text-xs'>
                        <Link href={"https://github.com/Ajith7736/codescope"} target='_blank' className='hover:underline'><li>Github</li></Link>
                    </ul>
                    <ul className='text-xs'>
                        <Link href={"https://vercel.com"} target='_blank' className='hover:underline'><li>Vercel</li></Link>
                    </ul>
                    <ul className='text-xs'>
                        <Link href={"https://nextjs.org/"} target='_blank' className='hover:underline'><li>Nextjs</li></Link>
                    </ul>
                </div>
                <div className='h-8 w-20 dark:bg-indigo-600/60   rounded-full blur-2xl absolute left-0'></div>
                <div className='h-8 w-20 dark:bg-indigo-600/60 rounded-full blur-2xl absolute right-0'></div>
        </div>
    )
}

export default Footer
