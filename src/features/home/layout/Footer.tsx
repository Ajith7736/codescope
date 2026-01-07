"use client"

import Link from 'next/link'


function Footer() {

    interface linksprops {
        name: string,
        link: any,
        type?: string
    }

    const links: linksprops[] = [
        {
            name: "GITHUB",
            link: "https://github.com/Ajith7736/codescope",
            type: "blank"
        },
        {
            name: "VERCEL",
            link: "https://vercel.com",
            type: "blank"
        },
        {
            name: "NEXTJS",
            link: "https://nextjs.org/",
            type: "blank"
        },
        {
            name: "TERMS AND CONDITIONS",
            link: "/Terms"
        },
        {
            name: "ABOUT",
            link: "/About"
        },
        {
            name: "CONTACT",
            link: "/Contact"
        }
    ]

    return (

        <footer className='md:px-20 w-full overflow-hidden bg-light-surface relative dark:bg-dark-border/30 border-t border-light-border dark:border-dark-border  p-5 flex xss:flex-col md:flex-row xss:items-center md:justify-between xss:gap-3 md:gap-0'>
            <Link href={"/"} className='text-2xl xss:text-xs flex items-center gap-3 font-extrabold'>CodeScope AI © 2025</Link>
            <div className='flex flex-row gap-3 text-light-text-on-hover dark:text-dark-text-on-hover items-center'>
                {links.map((item, index) => {
                    return <ul key={index} className='xss:text-[10px] md:text-xs'>
                        <li><Link href={item.link} target={item.type === "blank" ? '_blank' : ''} className='text-dark-accent/50 hover:text-dark-accent transition-all duration-300'>{item.name}</Link></li>
                    </ul>
                })}
            </div>
            <div className='h-8 w-20 -z-10 dark:bg-indigo-600/60  rounded-full blur-2xl absolute left-0'></div>
            <div className='h-8 w-20 -z-10 dark:bg-indigo-600/60 rounded-full blur-2xl absolute right-0'></div>
        </footer>
    )
}

export default Footer
