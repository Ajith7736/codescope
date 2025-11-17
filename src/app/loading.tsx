"use client"
import { useEffect, useState } from 'react'
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import { useTheme } from 'next-themes'


function Loading() {
    const [isClient, setisClient] = useState(false)
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        setisClient(true)
    }, [])

    if (!isClient) return null;

    return (
        <div className='absolute w-screen h-screen z-10 dark:bg-dark-black bg-light-white flex justify-center items-center'>
            <Ring
                size="40"
                stroke="5"
                bgOpacity="0"
                speed="2"
                color={resolvedTheme === "dark" ? "white" : "black"}
            />
        </div>
    )
}

export default Loading;
