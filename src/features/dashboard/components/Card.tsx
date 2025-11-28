import { DashCardProps } from '@/types/type'
import Number from '@/ui/Number/Number'
import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'

function Card({ item }: { item: DashCardProps }) {
    return (
        <div className='dark:bg-dark-surface bg-light-gray border border-dark-border flex flex-col p-7 xss:gap-3 md:gap-4 xss:w-52 md:w-52  items-center rounded-md'>
            <div className={`${item.style} rounded-md p-5`}>{item.icon}</div>
            <SecondTitle className=''><Number n={item.number}/></SecondTitle>
            <SmallText className='text-dark-text-primary'>{item.title}</SmallText>
        </div>
    )
}

export default Card
