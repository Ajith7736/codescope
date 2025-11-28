import { cn } from '@/lib/utils'
import { Inputs } from '@/types/type'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface InputBoxprops {
    type: string,
    id: "name" | "email" | "password",
    className?: string,
    placeholder: string,
    register: UseFormRegister<any>,
    required: { value: boolean, message: string },
    errors: FieldErrors<Inputs>
}

function InputBox({ type, id, className, placeholder, register, errors, required }: InputBoxprops) {
    return (
        <>
            <input type={type}
                {...register(id, { required })} id={id} placeholder={placeholder} className={cn(`bg-light-surface-hover dark:bg-dark-input-bg border  ${errors.name ? 'border-red-500/30 focus:outline-red-400/50' : 'border-light-border dark:border-dark-input-border'} focus:outline focus:outline-light-text-muted/30   focus:dark:outline-dark-activeborder w-full px-2 py-1.5 rounded-md xss:text-xs md:text-sm`, className)} />
            {id === "name" ? errors.name && <div className='w-[20rem] text-xs text-red-500'>{errors.name.message}</div> : id === "email" ? errors.email && <div className='w-[20rem] text-xs text-red-500'>{errors.email.message}</div> : errors.password && <div className='w-[20rem] text-xs text-red-500'>{errors.password.message}</div>}
        </>
    )
}

export default InputBox
