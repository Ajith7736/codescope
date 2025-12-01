import { Code } from 'lucide-react'
import ThemeToggler from '../../../ui/Theme/ThemeToggler'
import Link from 'next/link'
import Container from '@/ui/container'


function Navbar() {


    return (
        <nav className='sticky top-0 z-20 dark:bg-dark-background/80 bg-light-background/80  backdrop-blur-xl'>
            <Container className='min-h-[10vh] flex items-center justify-between'>
                <Link href={"/"} className='text-2xl xss:text-lg flex items-center gap-3 font-family-bebas'><span><Code size={20} className='bg-indigo-600 p-1 rounded-[3px] text-white h-7 w-7' strokeWidth={3}/></span>CodeScope AI</Link>
                <div className='flex gap-5 items-center text-lg'>
                    <Link href={"/Signup"} className='bg-light-surface px-4 py-1 cursor-pointer rounded-md hover:bg-light-surface-hover transition duration-300 dark:bg-dark-surface dark:hover:bg-dark-surface-hover xss:text-[12px] sm:text-sm lg:text-base'>SignUp</Link>
                    <div><ThemeToggler /></div>
                </div>
            </Container>
        </nav>

    )
}

export default Navbar
