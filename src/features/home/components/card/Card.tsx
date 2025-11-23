import React from 'react'

function Card({ logo, title, desc }: { logo: React.ReactElement, title: string, desc: string }) {
    return (
        <div className='bg-light-gray group flex flex-col gap-3 items-start p-5 dark:bg-dark-gray rounded-[17px]  w-full  md:w-[40%] border hover:border-light-activeborder/60 border-light-activeborder/30 transition-all duration-300 dark:border-dark-inputborder'>
            <div className='bg-light-hoverblack shadow-light-activeborder/90 shadow-md dark:shadow-lg dark:shadow-black group-hover:border-light-activeborder/50 transition-all duration-700 rounded-[14px] dark:bg-dark-activeborder/10 p-4 dark:border dark:border-light-activeborder/20 text-light-white'>{logo}</div>
            <div className=' font-bold xss:text-base'>{title}</div>
            <div className='text-xs text-light-activeborder dark:text-dark-activeborder'>{desc}</div>
        </div>
    )
}

export default Card
