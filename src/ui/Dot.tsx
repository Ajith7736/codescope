import { cn } from '@/lib/utils'

function Dot({ variant = "amber" }: { variant?: "amber" | "emerald" }) {

    const variants = {
        amber: 'bg-amber-300',
        emerald: 'bg-emerald-500'
    }

    return (
        <div className={cn(`h-[5px] w-[5px] rounded-full`, variants[variant])}></div>
    )
}

export default Dot
