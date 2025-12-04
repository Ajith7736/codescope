"use client"
import { motion } from "motion/react"
import { signOut } from '@/lib/actions/auth-actions';
import { useSession } from '@/lib/auth-client';
import Link from "next/link";


function UserBlock() {
    const { refetch } = useSession();
    const handlelogout = async () => {
        await signOut();
        await refetch();
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='transition-all duration-300 bg-light-surface dark:bg-dark-surface border shadow-md border-light-border dark:border-dark-border p-1 w-52 xss:text-xs md:text-sm flex flex-col items-start gap-1'>
            <Link href={'/Pricing'} className="p-1 cursor-pointer hover:bg-dark-accent/10 w-full text-start">Pricing</Link>
            <div className='p-1 cursor-pointer w-full hover:bg-dark-accent/10  text-start text-red-500' onClick={handlelogout}>Logout</div>
        </motion.div>
    )
}

export default UserBlock
