"use client"
import Loading from '@/app/loading'
import Authcard from '@/features/login/components/Authcard'
import { signIn } from '@/lib/actions/auth-actions'
import { useSession } from '@/lib/auth-client'
import { Authproviders } from '@/lib/Authproviders'
import { delay } from '@/lib/delay'
import { Signinprops } from '@/types/type'
import InputBox from '@/ui/Forms/InputBox'
import ButtonLoader from '@/ui/loaders/ButtonLoader'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

function page() {
    const { data: session, isPending , refetch } = useSession();
    useEffect(() => {
        if (session) {
            redirect("/Dashboard")
        }
    }, [session])

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Signinprops>()

    const required: { value: boolean, message: string } = {
        value: true,
        message: "This field is required"
    }

    const onSubmit: SubmitHandler<Signinprops> = async (data) => {
        await delay();
        const { success, message } = await signIn(data.email, data.password);
        if (success) {
            toast.success(message)
            await refetch();
        } else {
            toast.error(message)
        }
    }

    if (isPending) return <Loading />

    return (
        <div className={`relative w-screen min-h-dvh flex flex-col gap-3 justify-center items-center p-8`}>
            <Link href={"/"} className='absolute top-5 left-5 hover:bg-light-surface-hover dark:hover:bg-dark-surface-hover p-2 cursor-pointer rounded-md flex gap-2 items-center transition duration-300 text-sm'><ArrowLeft size={15} />Back</Link>
            <div className='text-xl xss:text-base font-bold'>Welcome Back</div>
            <div className=' text-light-text-muted dark:text-dark-text-muted text-sm xss:text-xs text-center'>Enter your email and password.</div>
            <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col ${(errors.email || errors.password) ? 'gap-2' : 'gap-3'} xss:w-[20rem] w-[24rem] items-center text-sm`}>
                <InputBox errors={errors} id='email' placeholder='Enter your email' register={register} required={required} type='email' />
                <InputBox errors={errors} id='password' placeholder='Enter your password' register={register} required={required} type='password' />
                {isSubmitting ? <button className='bg-light-black transition duration-300 flex justify-center disabled:bg-light-hoverblack disabled:dark:bg-indigo-500 bg-indigo-600 cursor-pointer dark:hover:bg-dark-hoverwhite p-2 rounded-md font-extrabold w-full'>
                    <ButtonLoader size={20} invert />
                </button> :
                    <input type='submit' value="Submit" disabled={isSubmitting} className='bg-light-black transition bg-indigo-600 text-white duration-300 disabled:bg-light-hoverblack disabled:dark:bg-indigo-500 hover:bg-indigo-700 cursor-pointer dark:hover:bg-dark-hoverwhite  p-2 rounded-md font-extrabold w-full' />
                }
            </form>
            <div className='flex w-[20rem] items-center justify-between gap-3'>
                <div className='w-full h-px bg-indigo-500'></div>
                <div className='xss:text-xs  font-bold  text-light-activeborder dark:text-dark-activeborder '>OR</div>
                <div className='w-full h-px bg-indigo-500'></div>
            </div>
            <div className='flex flex-col gap-3'>
                {Authproviders.map((card) => {
                    return <Authcard key={card.provider} img={card.img} provider={card.provider} />
                })}
            </div>
            <div className='text-sm xss:text-xs text-light-activeborder dark:text-dark-activeborder '>Dont have an Account ? <Link href={"/Signup"} className='hover:underline text-light-black dark:text-dark-white'>SignUp</Link></div>
        </div>
    )
}

export default page
