import { cn } from '@/lib/utils'
import React from 'react'

function SmallText({ children, textcolor, className }: { children: React.ReactNode, textcolor?: string, className?: string }) {
   return (
      <p className={cn(` xss:text-xs lg:text-sm`,className,textcolor)}>
         {children}
      </p>
   )
}

export default SmallText
