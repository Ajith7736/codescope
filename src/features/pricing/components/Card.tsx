import { plansprops } from '@/types/type'
import Button from '@/ui/Buttons/Button'
import { Check } from 'lucide-react'
import React from 'react'

function Card({ item }: { item: plansprops }) {


    return (
        <>
            <div className='bg-dark-surface-hover border xss:w-full md:w-[50%] lg:w-[30%]   rounded-md p-5 flex flex-col gap-5 border-dark-border'>
                <h1 className='text-2xl font-extrabold flex gap-3 items-center'>{item.pricing}<span className='text-xs'>/month</span></h1>
                <h3 className='font-bold'>{item.plantype}</h3>
                <p className='text-xs text-dark-text-muted'>{item.plandesc}</p>
                <ul className='flex flex-col gap-3'>
                    {item.planadv?.map((adv, index) => {
                        return <li key={index} className='text-xs flex gap-2 items-center'><Check size={15} className='text-emerald-500' />{adv.message}</li>
                    })}
                </ul>
                <Button variant='blue' className='font-extrabold'>Choose Plan</Button>
            </div>
        </>

    )
}

export default Card
