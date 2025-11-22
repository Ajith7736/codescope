import React from 'react'

function SmallText({ children, textcolor, className }: { children: React.ReactNode, textcolor?: string, className?: string }) {
   return (
      <p className={`${className} xss:text-xs lg:text-sm ${textcolor}`}>
         {children}
      </p>
   )
}

export default SmallText
