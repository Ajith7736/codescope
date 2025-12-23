import { Ring } from "ldrs/react"

export const VerificationLoader = () => {
    return <>
        <div role='status' aria-live='polite' aria-label='loading content' className='fixed inset-0 z-50 dark:bg-dark-background bg-light-background flex flex-col gap-5 justify-center items-center'>
            <Ring
                size={40}
                stroke={5}
                bgOpacity={0.2}
                speed={2}
                color={"oklch(69.6% 0.17 162.48)"}
            />
            <h1 className="text-xs italic dark:text-dark-text-muted">Please wait for verification...</h1>
        </div>
    </>
}