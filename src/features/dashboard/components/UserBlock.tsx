import React from 'react'
import { motion } from "motion/react"
import { signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

function UserBlock() {
    const router = useRouter();
    const handlelogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.replace("/Signup"); 
                },
            },
        });
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=' bg-light-hovergray dark:bg-dark-gray border shadow-md border-light-activeborder/20 p-1 w-52 text-sm'>
            <div className='p-1 cursor-pointer w-full hover:bg-light-activeborder/10 text-start text-red-500' onClick={handlelogout}>Logout</div>
        </motion.div>
    )
}

export default UserBlock
