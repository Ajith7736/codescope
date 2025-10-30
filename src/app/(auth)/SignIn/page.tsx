"use client"
import Loading from '@/app/loading'
import Authcard from '@/features/login/components/Authcard'
import { signIn } from '@/lib/actions/auth-actions'
import { useSession } from '@/lib/auth-client'
import { Authproviders } from '@/lib/Authproviders'
import { delay } from '@/lib/delay'
import { Signinprops } from '@/types/type'
import { ArrowLeft, LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

function page() {
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (session) {
            redirect("/Dashboard")
        }
    }, [session])

    const {
        register,
        handleSubmit,
        watch,
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
        } else {
            toast.error(message)
        }
    }

    if (isPending) return <Loading />

    return (
        <div className={`relative w-screen h-screen flex flex-col gap-3 justify-center items-center p-8`}>
            <Link href={"/"} className='absolute top-5 left-10 hover:bg-light-hovergray dark:hover:bg-dark-hovergray p-2 cursor-pointer rounded-md flex gap-2 items-center transition duration-300 text-sm'><ArrowLeft size={15} />Back</Link>
            <div className='text-xl xss:text-base font-bold'>Welcome Back</div>
            <div className=' text-light-activeborder dark:text-dark-activeborder text-sm xss:text-xs text-center'>Enter your email and password.</div>
            <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col ${(errors.email || errors.password) ? 'gap-2' : 'gap-3'} xss:w-[20rem] w-[24rem] items-center text-sm`}>
                <input type="email"
                    {...register("email", { required })} id='email' placeholder='Enter your email' className={`bg-light-hovergray dark:bg-dark-inputfield border  ${errors.email ? 'border-red-500/30 focus:outline-red-400/50' : 'border-light-activeborder/60 dark:border-dark-inputborder'} focus:outline focus:outline-dark-activeborder w-full px-2 py-1.5 rounded-md xss:text-xs md:text-sm`} />
                {errors.email && <div className='w-[20rem] text-xs text-red-500'>{errors.email.message}</div>}
                <input type="password"
                    {...register("password", { required })} id='password' placeholder='Enter your password' className={`bg-light-hovergray dark:bg-dark-inputfield border ${(errors.password) ? 'border-red-500/30 focus:outline-red-400/50' : 'border-light-activeborder/60 dark:border-dark-inputborder'}  focus:outline focus:outline-dark-activeborder w-full px-2 py-1.5 rounded-md xss:text-xs md:text-sm`} />
                {errors.password && <div className='w-[20rem] text-xs text-red-500'>{errors.password.message}</div>}
                {isSubmitting ? <button className='flex justify-center bg-light-black transition duration-300 disabled:bg-light-hoverblack disabled:dark:bg-dark-hoverwhite hover:bg-light-hoverblack dark:bg-dark-white cursor-pointer dark:hover:bg-dark-hoverwhite text-light-white dark:text-dark-black p-2 rounded-md font-extrabold w-full'>
                    <LoaderCircle size={20} className='animate-spin text-center text-white dark:text-black' />
                </button> :
                    <input type='submit' value="Submit" disabled={isSubmitting} className='bg-light-black transition duration-300 disabled:bg-light-hoverblack disabled:dark:bg-dark-hoverwhite hover:bg-light-hoverblack dark:bg-dark-white cursor-pointer dark:hover:bg-dark-hoverwhite text-light-white dark:text-dark-black p-2 rounded-md font-extrabold w-full' />
                }
            </form>
            <div className='flex w-[20rem] items-center justify-between gap-3'>
                <div className='w-full h-px bg-light-activeborder dark:bg-dark-activeborder/50'></div>
                <div className='xss:text-xs  font-bold  text-light-activeborder dark:text-dark-activeborder '>OR</div>
                <div className='w-full h-px bg-light-activeborder dark:bg-dark-activeborder/50'></div>
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
