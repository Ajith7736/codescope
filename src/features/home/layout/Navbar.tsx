"use client"
import { Code } from 'lucide-react'
import ThemeToggler from '../../../ui/Theme/ThemeToggler'
import Link from 'next/link'
import Container from '@/ui/container'


function Navbar() {


    return (
        <nav aria-label='primary navigation' className='sticky top-0 z-20 backdrop-blur-xl bg-light-background/85 dark:bg-dark-background/60'>
            <Container className='min-h-[10vh] flex items-center justify-between'>
                <Link href={"/"} className=' flex items-center gap-3 font-family-bebas'>
                    <span><Code className='bg-indigo-600 xss:size-6 lg:size-7 p-1 rounded-[3px] text-white h-7 w-7' strokeWidth={3} /></span>
                    <strong className="font-family-mono font-extrabold">CODESCOPE</strong>
                </Link>
                <ul className='flex gap-5 items-center text-lg'>
                    <li>
                        <Link href={"/Signup"} className='bg-light-surface px-4 py-1 cursor-pointer rounded-md hover:bg-light-surface-hover transition duration-300 dark:bg-dark-surface  dark:text-dark-text-primary text-light-text-primary hover:dark:text-dark-text-on-hover hover:text-light-text-on-hover dark:hover:bg-dark-surface-hover/70 xss:text-[10px] lg:text-[12px]'>SignUp</Link>
                    </li>
                    <li>
                        <Link href={"/Billing"} className='xss:text-[10px] lg:text-[12px] hover:text-light-text-on-hover transition-all duration-300 dark:hover:text-dark-text-on-hover text-light-text-primary dark:text-dark-text-primary'>Pricing</Link>
                    </li>
                    <li>
                        <ThemeToggler />
                    </li>
                </ul>
            </Container>
        </nav>

    )
}

export default Navbar
