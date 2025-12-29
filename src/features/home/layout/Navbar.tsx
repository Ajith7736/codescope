"use client"
import { Code } from 'lucide-react'
import ThemeToggler from '../../../ui/Theme/ThemeToggler'
import Link from 'next/link'
import Container from '@/ui/container'


function Navbar() {


    return (
        <nav className='sticky top-0 z-20 dark:bg-dark-background/80 bg-light-background/80  backdrop-blur-xl'>
            <Container className='min-h-[10vh] flex items-center justify-between'>
                <Link href={"/"} className=' flex items-center gap-3 font-family-bebas'>
                    <span><Code className='bg-indigo-600 xss:size-6 lg:size-7 p-1 rounded-[3px] text-white h-7 w-7' strokeWidth={3} /></span>
                    <span className="">CodeScope AI</span>
                </Link>
                <div className='flex gap-5 items-center text-lg'>
                    <Link href={"/Signup"} className='bg-light-surface px-4 py-1 cursor-pointer rounded-md hover:bg-light-surface-hover transition duration-300 dark:bg-dark-surface  dark:text-dark-text-primary text-light-text-primary hover:dark:text-dark-text-on-hover hover:text-light-text-on-hover dark:hover:bg-dark-surface-hover xss:text-[10px] lg:text-[12px]'>SignUp</Link>
                    <Link href={"/Billing"} className='xss:text-[10px] lg:text-[12px] hover:text-light-text-on-hover transition-all duration-300 dark:hover:text-dark-text-on-hover text-light-text-primary dark:text-dark-text-primary'>Pricing</Link>
                    <div><ThemeToggler /></div>
                </div>
            </Container>
        </nav>

    )
}

export default Navbar
