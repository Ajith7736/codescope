import { cn } from '@/lib/utils'
import React from 'react'

function SmallText({ children, textcolor, className }: { children: React.ReactNode, textcolor?: string, className?: string }) {
   return (
      <p className={cn(className,textcolor,` xss:text-[9px] md:text-xs`)}>
         {children}
      </p>
   )
}

export default SmallText
