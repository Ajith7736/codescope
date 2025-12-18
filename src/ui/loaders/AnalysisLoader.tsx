import { Ring2, } from 'ldrs/react'
import { Layers, Shield, Zap } from 'lucide-react'


function AnalysisLoader({ type }: { type: "Architecture" | "Security" | "Performance" }) {
    return (
        <div className='relative'>
            <Ring2
                size="70"
                stroke="4"
                strokeLength="0.7"
                speed="1"
                color={type === "Architecture" ? "oklch(62.3% 0.214 259.815)" : type === "Performance" ? "oklch(70.5% 0.213 47.604)" : "oklch(63.7% 0.237 25.331)"}
            />
            {type === "Architecture" ? <Layers color='oklch(62.3% 0.214 259.815)' size={28} className='absolute top-5 left-5 animate-pulse' /> :  type === "Performance" ? <Zap color='oklch(70.5% 0.213 47.604)' size={28} className='absolute top-5 left-5 animate-pulse' /> : <Shield color='oklch(63.7% 0.237 25.331)' size={30} className='absolute top-5 left-5 animate-pulse' />} 
        </div>
    )
}

export default AnalysisLoader

