"use client"

import { authClient, useSession } from '@/lib/auth-client';
import ButtonLoader from '@/ui/loaders/ButtonLoader';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';


function Authcard({ img, provider }: { img: React.ReactElement, provider: "google" | "github" }) {
    const { data: session } = useSession();
    const [isloading, setisloading] = useState(false);


    const handlesocial = async () => {
        setisloading(true);
        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: "/Dashboard"
            });
            if (error) {
                toast.error("SignIn Failed");
            }

        } catch (err) {
            toast.error("Server Error")
        }
    }




    return (
        <div>
            {!session && isloading ? <button
                className="group h-12 px-6 border cursor-pointer  bg-light-gray dark:bg-dark-surface/70 bg-light-text-muted/10 border-light-border dark:border-dark-border rounded-md w-[20rem] transition duration-300 hover:border-light-accent/50  dark:hover:border-dark-accent/50 ">
                <ButtonLoader />
            </button>
                :
                <button
                    type='button'
                    onClick={handlesocial}
                    className="group h-12 px-6 border cursor-pointer  bg-light-gray dark:bg-dark-surface/70 bg-light-text-muted/10 border-light-border dark:border-dark-border rounded-md w-[20rem] transition duration-300 hover:border-light-accent/50  dark:hover:border-dark-accent/50 ">
                    <div className="relative flex items-center space-x-4 justify-around">
                        {img}
                        <span className="block capitalize  w-max font-semibold tracking-wide text-light-text-muted group-hover:text-light-black dark:text-dark-text-muted text-sm xss:text-xs  transition duration-300 dark:group-hover:text-dark-text-primary group-hover:text-light-text-primary">Continue
                            with {provider}
                        </span>
                    </div>
                </button>
            }
        </div>
    )
}

export default Authcard
