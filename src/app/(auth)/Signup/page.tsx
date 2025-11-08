"use client"
import Authcard from '@/features/login/components/Authcard'
import { signUp } from '@/lib/actions/auth-actions'
import { delay } from '@/lib/delay'
import passwordchecker from '@/lib/passwordchecker'
import { useSession } from '@/lib/auth-client'
import { Inputs } from '@/types/type'
import { ArrowLeft, LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import Loading from '@/app/loading'
import { Authproviders } from '@/lib/Authproviders'
import { redirect, useRouter } from 'next/navigation'
import { useEffect } from 'react'

function Page() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session){
      redirect("/Dashboard")
    }
  }, [session,router])
  
  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const password = watch('password', '');

  const { strengthcolor } = passwordchecker(password);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await delay();
    const { message, success }  = await signUp(data.email, data.password, data.name);
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }


  const required: { value: boolean, message: string } = {
    value: true,
    message: "This field is required"
  }

  const pattern: { value: RegExp, message: string } = {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
    message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
  }

  if (isPending) return <Loading />

  return (
    <div className={`relative w-screen h-screen flex flex-col gap-3 justify-center items-center p-8`}>
      <Link href={"/"} className='absolute top-5 left-10 hover:bg-light-hovergray dark:hover:bg-dark-hovergray p-2 cursor-pointer rounded-md flex gap-2 items-center transition duration-300 text-sm'><ArrowLeft size={15} />Back</Link>
      <div className='text-xl xss:text-base font-bold'>Create your account</div>
      <div className=' text-light-activeborder dark:text-dark-activeborder text-sm xss:text-xs text-center'>Enter your details below to create your account</div>
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col ${(errors.email || errors.name || errors.password) ? 'gap-2' : 'gap-3'} xss:w-[20rem] w-[24rem] items-center text-sm`}>
        <input type="text"
          {...register("name", { required })} id='name' placeholder='Enter your name' className={`bg-light-hovergray dark:bg-dark-inputfield border  ${errors.name ? 'border-red-500/30 focus:outline-red-400/50' : 'border-light-activeborder/60 dark:border-dark-inputborder'} focus:outline focus:outline-dark-activeborder w-full px-2 py-1.5 rounded-md xss:text-xs md:text-sm`} />
        {errors.name && <div className='w-[20rem] text-xs text-red-500'>{errors.name.message}</div>}
        <input type="email"
          {...register("email", { required })} id='email' placeholder='Enter your email' className={`bg-light-hovergray dark:bg-dark-inputfield border  ${errors.email ? 'border-red-500/30 focus:outline-red-400/50' : 'border-light-activeborder/60 dark:border-dark-inputborder'} focus:outline focus:outline-dark-activeborder w-full px-2 py-1.5 rounded-md xss:text-xs md:text-sm`} />
        {errors.email && <div className='w-[20rem] text-xs text-red-500'>{errors.email.message}</div>}
        <input type="password"
          {...register("password", { required, pattern })} id='password' placeholder='Enter your password' className={`bg-light-hovergray dark:bg-dark-inputfield border ${(errors.password && password === "") ? 'border-red-500/30 focus:outline-red-400/50' : password !== "" ? strengthcolor : 'border-light-activeborder/60 dark:border-dark-inputborder'}  focus:outline focus:outline-dark-activeborder w-full px-2 py-1.5 rounded-md xss:text-xs md:text-sm`} />
        {errors.password && <div className='w-[20rem] text-xs text-red-500'>{errors.password.message}</div>}
        {isSubmitting ? <button className='flex justify-center bg-light-black transition duration-300 disabled:bg-light-hoverblack disabled:dark:bg-dark-hoverwhite hover:bg-light-hoverblack dark:bg-dark-white cursor-pointer dark:hover:bg-dark-hoverwhite text-light-white dark:text-dark-black p-2 rounded-md font-extrabold w-full'>
          <LoaderCircle size={20} className='animate-spin text-center text-white dark:text-black' />
        </button> :
          <input type='submit' value="Submit" disabled={isSubmitting} className='bg-light-black transition duration-300 disabled:bg-light-hoverblack disabled:dark:bg-dark-hoverwhite hover:bg-light-hoverblack dark:bg-dark-white cursor-pointer dark:hover:bg-dark-hoverwhite text-light-white dark:text-dark-black p-2 rounded-md font-extrabold w-full' />
        }
      </form>
      <div className='flex w-[20rem] items-center gap-3'>
        <div className='w-full h-px bg-light-activeborder dark:bg-dark-activeborder/50'></div>
        <div className='xss:text-xs  font-bold  text-light-activeborder dark:text-dark-activeborder '>OR</div>
        <div className='w-full h-px bg-light-activeborder dark:bg-dark-activeborder/50'></div>
      </div>
      <div className='flex flex-col gap-3'>
        {Authproviders.map((card) => {
          return <Authcard key={card.provider} img={card.img} provider={card.provider} />
        })}
      </div>
      <div className='text-sm xss:text-xs text-light-activeborder dark:text-dark-activeborder '>Already have an account ? <Link href={"/SignIn"} className='hover:underline text-light-black dark:text-dark-white'>SignIn</Link></div>
    </div>
  )
}

export default Page
