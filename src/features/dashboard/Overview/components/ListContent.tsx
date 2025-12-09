import List from './List'
import { DotProps, OverviewObject } from '@/types/type'
import { ReactElement } from 'react'

function ListContent({ list, variant , icon , title}: { list: OverviewObject[] | undefined, variant: DotProps, icon : ReactElement , title : string }) {
    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-[13px] flex gap-2 items-center font-extrabold'>{icon}{title}</h1>
            <ul className='text-xs flex flex-col gap-3'>
                {list?.map((item, index) => {
                    return <List key={index} item={item} variant={variant} />
                })}
            </ul>
        </div>
    )
}

export default ListContent
