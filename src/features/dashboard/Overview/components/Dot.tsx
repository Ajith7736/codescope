import { cn } from '@/lib/utils'
import { DotProps } from '@/types/type'

function Dot({ variant = "amber" }: { variant?: DotProps}) {

    const variants = {
        amber: 'bg-amber-300',
        emerald: 'bg-emerald-500',
        blue: 'bg-blue-500'
    }

    return (
        <div className={cn(`h-[3px] w-[3px] rounded-full`, variants[variant])}></div>
    )
}

export default Dot
