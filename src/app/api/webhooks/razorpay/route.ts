import { failure, success, tryCatch } from "@/lib/server/api/api";
import { handleInvoice, handlePaymentCapture, handlePaymentFailed, handleSubscriptionActivated, handleSubscriptionAuthenticated, handleSubscriptionCharged } from "@/lib/server/razorpayactions.tsx/actions";
import { RazorpayInvoice, RazorpayOrder, RazorpayPayment, RazorpaySubscription, RazorpayWebhookEvent } from "@/types/razorpaytypes";
import crypto from "crypto"

export const dynamic = 'force-dynamic';


export const POST = tryCatch(async (req: Request) => {
    const body = await req.text();
    const recievedSignature = req.headers.get("x-razorpay-signature")

    if (!recievedSignature) {
        return failure({ message: "Missing signature" }, 404)
    }

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!).update(body).digest("hex");

    if (expectedSignature !== recievedSignature) {
        return failure({ message: "Verification Failed" })
    }

    const payload: RazorpayWebhookEvent<{
        payment?: {
            entity: RazorpayPayment
        },
        order?: {
            entity: RazorpayOrder
        },
        subscription?: {
            entity: RazorpaySubscription
        },
        invoice?: {
            entity: RazorpayInvoice
        }
    }> = JSON.parse(body);
    const event = payload.event;


    switch (event) {
        case 'payment.captured':
            await handlePaymentCapture(payload.payload.payment?.entity!);
            break;
        case 'invoice.paid':
            await handleInvoice(payload.payload.invoice?.entity!);
            break;
        case 'subscription.charged':
            await handleSubscriptionCharged(payload.payload.subscription?.entity!, payload.payload.payment?.entity!)
            break;
        case 'subscription.authenticated':
            await handleSubscriptionAuthenticated(payload.payload.subscription?.entity!);
            break
        case 'subscription.activated':
            await handleSubscriptionActivated(payload.payload.subscription?.entity!);
            break;
        case 'payment.failed':
            await handlePaymentFailed(payload.payload.payment?.entity!);
            break;
        case 'subscription.cancelled':
            break;
        case 'subscription.halted':
            break;
        case 'subscription.paused':
            break;
        case 'subscription.resumed':
            break;
    }

    return success({ message: "Success" })
})