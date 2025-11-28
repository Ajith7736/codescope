"use client"
import { Ring2 } from 'ldrs/react'
import 'ldrs/react/Ring2.css'


function BasicLoader() {
    return (
        <div className='relative'>
        <Ring2
            size="25"
            stroke="2.5"
            strokeLength="0.25"
            bgOpacity="0.2"
            speed="0.8"
            color="#4f39f6"
        />
        </div>
    )
}

export default BasicLoader

