import RiskText from '@/ui/Text/RiskText'
import { CircleCheckBig } from 'lucide-react'

function IssueCard() {
    return (
        <div className='bg-red-400/30 border-4 p-5 border-y-0 border-r-0 border-red-400 w-full flex flex-col gap-2'>
            <RiskText variant='warning'>High</RiskText>
            <h1 className='font-extrabold text-lg'>Heading</h1>
            <p className='text-light-black/80 text-sm'>UserService class has 1,247 lines and handles too many responsibilities.</p>
            <p className='text-light-black/80 text-xs'>UserService.ts Line: 15</p>
            <div className='bg-light-white w-full p-5 flex flex-col gap-2 rounded-md border border-light-activeborder/20'>
                <p className='text-xs flex gap-2'><CircleCheckBig size={13} className='text-green-500' />Suggessted Fix</p>
                <div className='bg-light-gray p-5 w-full border border-light-activeborder/20'>
                    <p className='text-light-black/80 text-sm'>Split into UserAuthService, UserProfileService, and UserNotificationService</p>
                </div>
            </div>
        </div>
    )
}

export default IssueCard
