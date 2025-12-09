import Dot from './Dot'
import { DotProps, OverviewObject } from '@/types/type'

function List({ item, variant }: { item: OverviewObject, variant: DotProps }) {
    return (
        <li className='flex flex-col items-baseline gap-2  pl-4'>
            {/* <Dot variant={variant} /> */}
            <h1 className='text-bold text-xs font-bold'>{item.title} :</h1>
            <p className='pl-1 text-[11px]'>{item.explaination}</p>
        </li>
    )
}

export default List
