import { Code } from 'lucide-react'
import ThemeToggler from '../../../ui/Theme/ThemeToggler'
import Link from 'next/link'

function Navbar() {
    return (
        <div className='min-h-[10vh] items-center flex justify-between px-5'>
            <Link href={"/"} className='text-2xl xss:text-xl flex items-center gap-2 font-extrabold'><span><Code /></span>CodeScope AI</Link>
            <div className='flex gap-5 items-center text-lg'>
                <Link href={"/Login"} className='bg-light-gray px-4 py-1 cursor-pointer rounded-md hover:bg-light-gray/80 smooth dark:bg-dark-gray dark:hover:bg-dark-gray/80 xss:text-base lg:text-lg'>Login</Link>
                <div><ThemeToggler /></div>
            </div>
        </div>
    )
}

export default Navbar
