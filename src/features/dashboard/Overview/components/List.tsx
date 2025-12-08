import React from 'react'
import Dot from './Dot'
import { DotProps } from '@/types/type'

function List({ item, variant }: { item: string, variant: DotProps }) {
    return (
        <li className='flex items-center gap-3'>
            <Dot variant={variant} />
            <h1>{item}</h1>
        </li>
    )
}

export default List
