"use client"

import Loading from '@/app/loading';
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react'
import { toast } from 'sonner';

function Authcard({ img, provider }: { img: React.ReactElement, provider: "google" | "github" }) {

    const handlesocial = async () => {
        await authClient.signIn.social({
            provider,
            callbackURL: "/Dashboard"
        });
    }

    return (
        <div>
            <button
                type='button'
                onClick={handlesocial}
                className="group h-12 px-6 border cursor-pointer  bg-light-gray dark:bg-dark-gray border-light-activeborder/30 dark:border-dark-activeborder/30 rounded-md w-[20rem] transition duration-300 hover:border-light-activeborder dark:hover:border-dark-activeborder ">
                <div className="relative flex items-center space-x-4 justify-around">
                    {img}
                    <span className="block capitalize  w-max font-semibold tracking-wide text-light-activeborder group-hover:text-light-black dark:text-dark-activeborder text-sm xss:text-xs  transition duration-300 dark:group-hover:text-dark-white">Continue
                        with {provider}
                    </span>
                </div>
            </button>
        </div>
    )
}

export default Authcard
