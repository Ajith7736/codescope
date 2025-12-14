import { toast } from "sonner";

export async function createsubscription(planId: string | undefined, userId: string | undefined) {
    try {
        const res = await fetch("/api/create-subscription", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ planId, userId })
        })

        const data = await res.json();

        if (!res.ok) return toast.error(data.message);

        return data;

    } catch (err) {
        console.error(err);
        toast.error("Server Error")
    }
}