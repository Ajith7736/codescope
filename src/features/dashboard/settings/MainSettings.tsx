'use client'
import { useTheme } from 'next-themes'
import React from 'react'

function MainSettings() {

    const { theme, setTheme } = useTheme();

    const handletheme = (theme: string) => {
        setTheme(theme);
    }

    return (
        <div className='p-5'>
            <div className='flex flex-col gap-3'>
                <h1 className='font-extrabold'>THEME</h1>
                {["dark", "light"].map((item) => {
                    return <div key={item} className='bg-light-surface border-light-border rounded-md dark:bg-dark-surface border dark:border-dark-border p-5' onClick={() => handletheme(item)}>
                        <div className='flex justify-between'>
                            <p className='font-bold uppercase'>{item}</p>
                            <div className='w-5 h-5 rounded-full dark:bg-white bg-light-text-muted/20 flex items-center justify-center'>
                                {theme === item && <div className='w-3 h-3 rounded-full bg-light-accent dark:bg-black'></div>}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default MainSettings