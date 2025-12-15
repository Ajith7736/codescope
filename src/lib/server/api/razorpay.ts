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

export async function verifypayment(paymentId: string, razorpaySignature: string, subscriptionId: string) {
    try {
        const res = await fetch("/api/verify-subscription", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ paymentId, subscriptionId, razorpaySignature })
        })

        const data = await res.json()

        console.log(data);

    } catch (err) {
        console.error(err);
        toast.error("Server Error");
    }
}