import { cn } from '@/lib/utils'
import { Layers, Shield, Zap } from 'lucide-react'

function StatusIcon({ type , variant} : { type : "Architecture"  | "Security" | "Performance" , variant : "high" | "medium" | "low"}) {
  
    const variants = {
        high : 'bg-red-500/10 border border-red-500/30  text-red-500',
        medium : 'bg-orange-500/10 border border-orange-500/30  text-orange-500 ',
        low : 'bg-blue-500/10 border border-blue-500/30  text-blue-500 '
    }

    return (
     <div className={cn(`xl:w-7 flex justify-center items-center xl:h-7 p-1 rounded-md`,variants[variant])}>
        {type === "Architecture" ? <Layers className='xss:size-4 lg:size-6' /> : type === "Performance" ? <Zap className='xss:size-4 lg:size-6' /> : <Shield className='xss:size-4 lg:size-6' />}
        </div>
  )
}

export default StatusIcon
