import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <p className='p-5 xss:text-xs text-center'>
            Built by <Link target='_blank' href={"https://nextjs.org/"}  className='underline'>Next.js</Link>, Hosted on <Link target='_blank' href={"https://vercel.com/"} className='underline'>vercel</Link>, Inspired by Shadcn UI. The source code is available on <Link target='_blank' href={"https://github.com/Ajith7736/codescope"} className='underline'>GitHub</Link>        </p>
    )
}

export default Footer
