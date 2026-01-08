import { toast } from "sonner"

export const api = {
    post: async (url: string, body: any) => {
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message)
            }

            return data;
        } catch (err) {
            toast.error("Network Error");
            throw Error("Network Error");
        }

    }
}