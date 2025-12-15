import { success, failure, tryCatch } from "@/lib/server/api/api";
import crypto from "crypto"

export const POST = tryCatch(async (req: Request) => {
    const { subscriptionId, paymentId, razorpaySignature } = await req.json();

    if (!subscriptionId || !paymentId || !razorpaySignature) {
        return failure({ message: "Couldnt verify the payment" });
    }

    const sign = paymentId + '|' + subscriptionId;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(sign).digest("hex");

    if (expectedSign === razorpaySignature) {
        return success({ message: "Verification Successfull" })
    } else {
        return failure({ message: "Verification Failed" })
    }

})