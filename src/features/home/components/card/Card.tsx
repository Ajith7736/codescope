import React from 'react'

function Card({ logo, title, desc }: { logo: React.ReactElement, title: string, desc: string }) {
    return (
        <div className='bg-light-gray flex flex-col gap-4 items-start p-5 dark:bg-dark-gray rounded-xl min-h-[30vh] w-full  md:w-[40%] border border-light-activeborder/30 dark:border-dark-inputborder'>
            <div className='bg-light-hoverblack rounded-2xl dark:bg-dark-white p-4 text-light-white dark:text-dark-black '>{logo}</div>
            <div className='lg:text-xl font-bold xss:text-lg'>{title}</div>
            <div className='lg:text-base xss:text-sm'>{desc}</div>
        </div>
    )
}

export default Card
