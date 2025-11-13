import { Ring2 } from 'ldrs/react'
import { useTheme } from 'next-themes'


function ButtonLoader({ size, stroke, invert }: { size?: number, stroke?: number, invert?: boolean }) {
    const { theme } = useTheme();
    return (
        <Ring2
            color={invert ? (theme === "light" ? "white" : "black") : theme === "light" ? 'black' : 'white'}
            size={size ? size : 17}
            speed={0.8}
            stroke={stroke ? stroke : 3}
            strokeLength={0.25}
            bgOpacity={0.1}
        />
    )
}

export default ButtonLoader
