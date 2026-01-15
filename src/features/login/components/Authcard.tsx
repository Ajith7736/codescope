"use client"

import { auth } from '@/lib/auth';
import { authClient, useSession } from '@/lib/auth-client';
import ButtonLoader from '@/ui/loaders/ButtonLoader';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';


function Authcard({ img, provider }: { img: React.ReactElement, provider: "google" | "github" }) {
    const { data: session, isPending } = useSession();
    const [isloading, setisloading] = useState<{ provider: "google" | "github" | null, show: boolean }>({
        provider: null,
        show: false
    });

    useEffect(() => {
        const json = localStorage.getItem("auth-loading");

        if (!json) {
            return
        }

        const loading = JSON.parse(json);

        if (loading.show) {
            setisloading({
                provider: loading.provider,
                show: true
            })
        }

        if (session) {
            localStorage.removeItem("auth-loading");
            setisloading({
                provider: null,
                show: false
            })
        }

        if (!session || !isPending) {
            setTimeout(() => {
                localStorage.removeItem("auth-loading");
                setisloading({
                    provider: null,
                    show: false
                })
            }, 3000);
        }

    }, [session, isPending])



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
                setisloading({ provider: null, show: false });
            }

        } catch (err) {
            console.log(err);
            toast.error("Server Error")
            localStorage.removeItem("auth-loading")
            setisloading({ provider: null, show: false });
        }
    }


    console.log(isloading)

    return (
        <div>
            {(isloading.show && isloading.provider === provider) || isPending ? <button
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
