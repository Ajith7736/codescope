import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'


function BackButton({ href, className }: { href: any, className?: string }) {
    return (
        <Link href={href} className={cn("flex gap-2 text-sm items-center hover:bg-dark-surface-hover/40 w-fit p-3", className)}><ArrowLeft className="size-4" />Back</Link>
    )
}

export default BackButton