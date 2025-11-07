"use client"


import { Toaster } from 'sonner'
import { useTheme, UseThemeProps } from 'next-themes'

function ToastWrapper({ children }: { children: React.ReactNode }) {

    const { resolvedTheme }: UseThemeProps = useTheme();


    return (
        <>
            <Toaster richColors position="top-right" style={{
                borderRadius: 50
            }} theme={resolvedTheme === "light" ? "light" : "dark"} />
            {children}
        </>
    )
}

export default ToastWrapper