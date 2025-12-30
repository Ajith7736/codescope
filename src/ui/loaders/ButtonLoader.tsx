import { Ring2 } from 'ldrs/react'
import { useTheme } from 'next-themes'


function ButtonLoader({ size, stroke, invert, variant = "normal" }: { size?: number, stroke?: number, invert?: boolean, variant?: "normal" | "purple" | "black" | "white" }) {
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
            /> : variant === "black" ? <Ring2
                color={'black'}
                size={size ? size : 17}
                speed={0.8}
                stroke={stroke ? stroke : 3}
                strokeLength={0.25}
                bgOpacity={0.5}
            /> :
                <Ring2
                    color={'white'}
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
