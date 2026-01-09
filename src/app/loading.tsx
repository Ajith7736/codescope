"use client"
import { Ring } from 'ldrs/react';
import { useEffect, useState } from 'react';

function Loading() {
    const [mounted, setmounted] = useState(false);

    useEffect(() => {
        setmounted(true);
    }, [])

    if(!mounted) return (
        <div className='fixed inset-0 z-50 dark:bg-dark-background bg-light-background flex justify-center items-center' >
            </div>
    )

    return (
        <div role='status' aria-live='polite' aria-label='loading content' className='fixed inset-0 z-50 dark:bg-dark-background bg-light-background flex justify-center items-center' >
                <Ring
                    size={40}
                    stroke={5}
                    bgOpacity={0.2}
                    speed={2}
                    color={"#6366f1"}
                />
        </div>
    )
}

export default Loading;
