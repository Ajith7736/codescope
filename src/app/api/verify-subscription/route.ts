import { success, failure, tryCatch } from "@/lib/server/api/api";
import crypto from "crypto"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"



export const POST = tryCatch(async (req: Request) => {
    const { subscriptionId, paymentId, razorpaySignature } = await req.json();


    if (!subscriptionId || !paymentId || !razorpaySignature) {
        return failure({ message: "Invalid Payment data" });
    }

    const sign = paymentId + '|' + subscriptionId;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(sign).digest("hex");

    if (expectedSign !== razorpaySignature) {
        return failure({ message: "Verification Failed" })
    }


    return success({ message: "Payment Authenticated successfully" })

})