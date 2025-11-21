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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{opacity: 0}} className=' bg-light-hovergray dark:bg-dark-gray border shadow-md border-light-activeborder/20 p-1 w-52 text-sm'>
                <div className='p-1 cursor-pointer w-full hover:bg-light-activeborder/10 transition-all duration-300 text-start text-red-500' onClick={handlelogout}>Logout</div>
            </motion.div>
    )
}

export default UserBlock
