"use client"

import { authClient, useSession } from '@/lib/auth-client';
import ButtonLoader from '@/ui/loaders/ButtonLoader';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';


function Authcard({ img, provider }: { img: React.ReactElement, provider: "google" | "github" }) {
    const { data: session } = useSession();
    const [isloading, setisloading] = useState<{ provider: "google" | "github" | null, show: boolean }>({
        provider: null,
        show: false
    });

    useEffect(() => {
        const loading = localStorage.getItem("auth-loading");
        if (!session && loading) {
            setTimeout(() => {
                localStorage.removeItem("auth-loading");
            }, 3000)
        } else if (loading) {
            const json = JSON.parse(loading);
            console.log(json);
            if (json.show) {
                setisloading({
                    provider: json.provider,
                    show: json.show
                })
            }
        }
    }, [])


    const handlesocial = async () => {
        setisloading({
            provider,
            show: true
        });
        localStorage.setItem("auth-loading", JSON.stringify({
            provider,
            show: true
        }));
        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: "/Dashboard"
            });
            if (error) {
                toast.error("SignIn Failed");
                localStorage.removeItem("auth-loading");
                setisloading({provider : null , show : false});
            }

        } catch (err) {
            console.log(err);
            toast.error("Server Error")
            localStorage.removeItem("auth-loading")
            setisloading({provider : null , show : false});
        }
    }




    return (
        <div>
            {!session && isloading.show && isloading.provider === provider ? <button
                className="group h-12 px-6 border cursor-pointer  bg-light-gray dark:bg-dark-surface/70 bg-light-text-muted/10 border-light-border dark:border-dark-border rounded-md w-[20rem] transition duration-300 hover:border-light-accent/50 flex items-center justify-center dark:hover:border-dark-accent/50 ">
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
