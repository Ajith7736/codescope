import { BookOpen } from 'lucide-react'
import List from './List'
import { DotProps } from '@/types/type'
import { ReactElement } from 'react'

function ListContent({ list, variant , icon , title}: { list: string[], variant: DotProps, icon : ReactElement , title : string }) {
    return (
        <div className='flex flex-col gap-3'>
            <h1 className='text-xs flex gap-2 items-center font-extrabold'>{icon}{title}</h1>
            <ul className='text-xs'>
                {list.map((item, index) => {
                    return <List key={index} item={item} variant={variant} />
                })}
            </ul>
        </div>
    )
}

export default ListContent
