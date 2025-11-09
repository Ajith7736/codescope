import React  from 'react'

function SmallText({children , textcolor } : {children : React.ReactNode , textcolor? : string}) {
  return (
     <p className={`xss:text-xs lg:text-sm ${textcolor}`}>
        {children}
     </p>
  )
}

export default SmallText
