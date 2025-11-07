import React from 'react'

function ProjectText({ children }: { children: React.ReactNode }) {
    return (
        <div className='xss:text-base lg:text-base font-bold '>
            {children}
        </div>
    )
}

export default ProjectText
