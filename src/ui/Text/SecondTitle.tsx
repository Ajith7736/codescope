import React from 'react'

function SecondTitle({children} : {children : React.ReactNode}) {
    return (
        <div className='xss:text-base lg:text-xl font-extrabold '>
            {children}
        </div>
    )
}

export default SecondTitle
