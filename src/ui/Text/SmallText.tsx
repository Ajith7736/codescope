import React  from 'react'

function SmallText({children} : {children : React.ReactNode}) {
  return (
     <p className='xss:text-xs lg:text-sm'>
        {children}
     </p>
  )
}

export default SmallText
