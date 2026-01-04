import { cn } from '@/lib/utils'
import { Inputs } from '@/types/type'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface InputBoxprops {
    type: React.ComponentPropsWithoutRef<"input">["type"],
    id: "name" | "email" | "password" | string,
    className?: string,
    placeholder: string,
    register: UseFormRegister<any>,
    errors: string | undefined,
    inputtype?: "input" | "textarea"
}

function InputBox({ type, id, className, placeholder, register, errors, inputtype }: InputBoxprops) {

    return (
        <>
            {inputtype === "textarea" ?
                <>
                <textarea
                    {...register(id)}
                    id={id}
                    placeholder={placeholder}
                    className={cn(`bg-light-surface-hover dark:bg-dark-input-bg border  ${errors ? 'border-red-500/30 focus:outline-red-400/50' : 'border-light-border dark:border-dark-input-border'} focus:outline focus:outline-light-text-muted/30   focus:dark:outline-dark-activeborder w-full px-2 py-1.5 rounded-md xss:text-xs md:text-sm h-30`, className)} />
                    {errors && <div className='w-[20rem] text-xs text-red-500'>{errors}</div>}
                </> :
                <>
                    <input
                        type={type}
                        {...register(id)}
                        id={id}
                        placeholder={placeholder}
                        className={cn(`bg-light-surface-hover dark:bg-dark-input-bg border  ${errors ? 'border-red-500/30 focus:outline-red-400/50' : 'border-light-border dark:border-dark-input-border'} focus:outline focus:outline-light-text-muted/30   focus:dark:outline-dark-activeborder w-full px-2 py-1.5 rounded-md xss:text-xs`, className)} />

                    {errors && <div className='w-[20rem] text-xs text-red-500'>{errors}</div>}
                </>}
        </>
    )
}

export default InputBox
