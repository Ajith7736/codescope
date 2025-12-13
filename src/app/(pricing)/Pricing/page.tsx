import { PricingContent } from '@/features/pricing/components/PricingContent'
import { auth } from '@/lib/auth'
import { plansprops } from '@/types/type'
import { headers } from 'next/headers'

async function Page() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

 

    return (
        <div>
            <PricingContent />
        </div>
    )
}

export default Page
