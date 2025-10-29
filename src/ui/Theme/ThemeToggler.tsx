import { useEffect, useState } from 'react'
import { useTheme, UseThemeProps } from 'next-themes';
import { SunDim, Moon } from 'lucide-react';
import { motion } from 'motion/react';

function ThemeToggler() {

    const { theme, setTheme }: UseThemeProps = useTheme();
    const [mounted, setmounted] = useState(false);

    useEffect(() => {
        setmounted(true);
    }, [])

    if (!mounted) return <button className='w-8 h-8 dark:w-[31px] dark:h-[31px]'></button>;

    return (
        <button className='dark:hover:bg-dark-hovergray hover:bg-light-hovergray p-1 dark:p-1.5 cursor-pointer rounded-xl transition-transform duration-300'>

            <motion.div
                key={theme}
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ ease: "easeInOut", delay: 0 }}>
                {theme === "light" ?
                    <SunDim onClick={() => setTheme("dark")} /> :
                    <Moon size={19} onClick={() => setTheme("light")} />
                }
            </motion.div>
        </button >
    )
}

export default ThemeToggler
