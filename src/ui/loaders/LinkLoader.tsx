import { Ring2 } from 'ldrs/react'

function LinkLoader({ type }: { type: "Link" | "Unlink" }) {
    return (
        <>{type === "Unlink" ? <Ring2
            color='red'
            bgOpacity={0.2}
            size={16}
            stroke={3}
        /> : <Ring2
            color='#4f39f6'
            bgOpacity={0.2}
            size={16}
            stroke={3}
        />}
        </>
    )
}

export default LinkLoader