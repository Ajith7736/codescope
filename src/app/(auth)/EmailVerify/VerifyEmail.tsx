import { VerifyEmailProps } from '@/types/type'


function VerifyEmail({ url, user }: VerifyEmailProps) {

    return (
        <div className='flex flex-col gap-2 h-screen w-screen justify-center items-center p-10'>
            <div className='font-extrabold'>Verify your Email</div>
            <div className='text-sm text-center'>Thank you for Signing up {user}.To complete your verification click the below button to verify your Email</div>
            <a href={url} className='bg-light-black text-white p-2 rounded-md hover:bg-light-hoverblack cursor-pointer'>Verify Email</a>
            <div className='text-sm'>or if the button didn't work just copy paste the below link</div>
            <div>{url}</div>
        </div>
    )
}

export default VerifyEmail;