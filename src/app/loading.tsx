"use client"
import React, { useEffect, useState } from 'react'
import { Trefoil } from 'ldrs/react'
import 'ldrs/react/Trefoil.css'
import { useTheme } from 'next-themes'


function Loading() {
    const [isClient, setisClient] = useState(false)
    const { resolvedTheme } = useTheme()

    useEffect(() => {
      setisClient(true)
    }, [])

    if(!isClient) return null;

    return (
        <div className='absolute w-screen h-screen z-10 dark:bg-dark-black bg-light-white flex justify-center items-center'>
            <Trefoil
                size="40"
                stroke="4"
                strokeLength="0.15"
                speed="1.4"
                color={ resolvedTheme === "dark" ? "white" : "black"}
            />
        </div>
    )
}

export default Loading;
