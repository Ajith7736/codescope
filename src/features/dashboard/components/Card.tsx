import { DashCardProps } from '@/types/type'
import SecondTitle from '@/ui/Text/SecondTitle'
import SmallText from '@/ui/Text/SmallText'

function Card({ item }: { item: DashCardProps }) {
    return (
        <div className='dark:bg-dark-gray bg-light-gray border border-light-activeborder/20 flex flex-col p-7 xss:gap-3 md:gap-4 xss:w-[18rem] md:w-52  items-center rounded-md'>
            <div className={`${item.style} rounded-md p-5`}>{item.icon}</div>
            <SecondTitle>{item.number}</SecondTitle>
            <SmallText>{item.title}</SmallText>
        </div>
    )
}

export default Card
