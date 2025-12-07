"use client"

import { useState } from 'react'
import { toast } from 'sonner';

function useFetch(url: string, method: string, body: any,refetch? : Function) {
    const [data, setdata] = useState<any | null>(null);
    const [loading, setloading] = useState<boolean>(false);
    const [error, seterror] = useState<string | null>(null);

    const fetchdata = async () => {
        try {
            setloading(true)
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            const resdata = await res.json();

            if (!res.ok) {
                toast.error(resdata.message);
            }

            if (res.status === 200 && resdata.message === "Repo is upto date") {
                toast.warning(resdata.message);
            }

            setdata(resdata);

            refetch && refetch();

        } catch (err) {
            toast.error("Server Error")
            seterror("Server error")
        } finally {
            setloading(false)
        }
    }

    return { data, error, loading, fetchdata };
}

export default useFetch
