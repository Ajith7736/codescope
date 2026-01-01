import { Ring2 } from 'ldrs/react'
import { useTheme } from 'next-themes'


function ButtonLoader({ size, stroke, invert, variant = "normal", color = "white" }: { size?: number, stroke?: number, invert?: boolean, variant?: "normal" | "custom", color?: "white" | "black" }) {
    const { resolvedTheme } = useTheme();
    return (
        <>
            {variant === "normal" ? <Ring2
                color={invert ? "white" : resolvedTheme === "light" ? 'black' : 'white'}
                size={size ? size : 17}
                speed={0.8}
                stroke={stroke ? stroke : 3}
                strokeLength={0.25}
                bgOpacity={0.1}
            /> : <Ring2
                color={color}
                size={size ? size : 17}
                speed={0.8}
                stroke={stroke ? stroke : 3}
                strokeLength={0.25}
                bgOpacity={0.5}
            />}
        </>
    )
}

export default ButtonLoader
