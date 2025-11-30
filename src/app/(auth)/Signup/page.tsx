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
import ButtonLoader from '@/ui/loaders/ButtonLoader'
import InputBox from '@/ui/Forms/InputBox'

function Page() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      redirect("/Dashboard")
    }
  }, [session, router])



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
    const { message, success } = await signUp(data.email, data.password, data.name);
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
      <Link href={"/"} className='absolute top-5 left-10 hover:bg-light-surface-hover dark:hover:bg-dark-surface-hover p-2 cursor-pointer rounded-md flex gap-2 items-center transition duration-300 text-sm'><ArrowLeft size={15} />Back</Link>
      <div className='text-xl xss:text-base font-bold'>Create your account</div>
      <div className=' text-light-text-muted dark:text-dark-text-muted text-sm xss:text-xs text-center'>Enter your details below to create your account</div>
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col ${(errors.email || errors.name || errors.password) ? 'gap-2' : 'gap-3'} xss:w-[20rem] w-[24rem] items-center text-sm`}>
        
        <InputBox id='name' errors={errors} placeholder='Enter your name' register={register} required={required} type='text'/>

        <InputBox id='email' errors={errors} placeholder='Enter your email' register={register} required={required} type='email'/>
        
        <input type="password"
          {...register("password", { required, pattern })} id='password' placeholder='Enter your password' className={`bg-light-surface-hover dark:bg-dark-input-bg border ${(errors.password && password === "") ? 'border-red-500/30 focus:outline-red-400/50' : password !== "" ? strengthcolor : 'border-light-border dark:border-dark-input-border'}  focus:outline focus:outline-light-text-muted/40 focus:dark:outline-dark-activeborder w-full px-2 py-1.5 rounded-md xss:text-xs md:text-sm`} />
        {errors.password && <div className='w-[20rem] text-xs text-red-500'>{errors.password.message}</div>}

        {isSubmitting ? <button className='bg-light-black transition duration-300 flex justify-center disabled:bg-light-hoverblack disabled:dark:bg-indigo-500 bg-indigo-600 cursor-pointer dark:hover:bg-dark-hoverwhite p-2 rounded-md font-extrabold w-full'>
          <ButtonLoader size={20} invert/>
        </button> :
          <input type='submit' value="Submit" disabled={isSubmitting} className='bg-light-black transition bg-indigo-600 text-white duration-300 disabled:bg-light-hoverblack disabled:dark:bg-indigo-500 hover:bg-indigo-700 cursor-pointer dark:hover:bg-dark-hoverwhite  p-2 rounded-md font-extrabold w-full' />
        }
      </form>
      <div className='flex w-[20rem] items-center gap-3'>
        <div className='w-full h-px bg-indigo-500'></div>
        <div className='xss:text-xs  font-bold  text-light-text-muted dark:text-dark-text-muted '>OR</div>
        <div className='w-full h-px bg-indigo-500'></div>
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
