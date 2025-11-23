"use client"
import { Code } from 'lucide-react'
import ThemeToggler from '../../../ui/Theme/ThemeToggler'
import Link from 'next/link'
import { useSession } from '@/lib/auth-client'
import { Session } from '@/types/type';
import { signOut } from '@/lib/actions/auth-actions';
import Container from '@/ui/container'


function Navbar() {

    const { data: session }: { data: Session | null } = useSession();


    const handlesignout = async () => {
        await signOut();
        window.location.href = "/Signup"
    }

    return (
        <div className='sticky top-0 z-20 bg-light-white/80 dark:bg-dark-black backdrop-blur-2xl'>
            <Container className='min-h-[10vh]  flex items-center justify-between'>
                <Link href={"/"} className='text-2xl xss:text-xl flex items-center gap-2 font-extrabold'><span><Code /></span>CodeScope AI</Link>
                <div className='flex gap-5 items-center text-lg'>
                    {session ? <button onClick={() => handlesignout()} className='bg-light-gray px-4 py-1 cursor-pointer rounded-md hover:bg-light-gray/80 transition duration-300 dark:bg-dark-gray dark:hover:bg-dark-gray/80 xss:text-sm lg:text-base'>SignOut</button> : <Link href={"/Signup"} className='bg-light-gray px-4 py-1 cursor-pointer rounded-md hover:bg-light-gray/80 transition duration-300 dark:bg-dark-gray dark:hover:bg-dark-gray/80 xss:text-sm lg:text-base'>SignUp</Link>}

                    <div><ThemeToggler /></div>
                </div>
            </Container>
        </div>

    )
}

export default Navbar
