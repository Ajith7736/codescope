"use client"
import { AnimatePresence, motion } from "motion/react"
import { signOut } from '@/lib/actions/auth-actions';
import { useSession } from '@/lib/auth-client';


function UserBlock() {
    const { refetch } = useSession();
    const handlelogout = async () => {
        await signOut();
        await refetch();
    }

    return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{opacity: 0}} className=' bg-light-surface dark:bg-dark-surface border shadow-md border-light-border dark:border-dark-border p-1 w-52 text-sm'>
                <div className='p-1 cursor-pointer w-full hover:bg-dark-accent/10 transition-all duration-300 text-start text-red-500' onClick={handlelogout}>Logout</div>
            </motion.div>
    )
}

export default UserBlock
