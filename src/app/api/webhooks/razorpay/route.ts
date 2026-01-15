import { failure, success, tryCatch } from "@/lib/server/api/api";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import { handleInvoice, handlePaymentCapture, handlePaymentFailed, handleSubscriptionActivated, handleSubscriptionAuthenticated, handleSubscriptionCancelled, handleSubscriptionCharged, handleSubscriptionHalted, handleSubscriptionPaused, handleSubscriptionResumed } from "@/lib/server/razorpayactions/actions";
import { RazorpayInvoice, RazorpayOrder, RazorpayPayment, RazorpaySubscription, RazorpayWebhookEvent } from "@/types/razorpaytypes";


export const dynamic = 'force-dynamic';


export const POST = tryCatch(async (req: Request) => {
    const body = await req.text();
    const recievedSignature = req.headers.get("x-razorpay-signature")

    if (!recievedSignature) {
        return failure({ message: "Missing signature" }, 404)
    }

    if (!validateWebhookSignature(body, recievedSignature, process.env.RAZORPAY_WEBHOOK_SECRET!)) {
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
            await handleSubscriptionCancelled(payload.payload.subscription?.entity!)
            break;
        case 'subscription.halted':
            await handleSubscriptionHalted(payload.payload.subscription?.entity!)
            break;
        case 'subscription.paused':
            await handleSubscriptionPaused(payload.payload.subscription?.entity!)
            break;
        case 'subscription.resumed':
            await handleSubscriptionResumed(payload.payload.subscription?.entity!)
            break;
    }

    return success({ message: "Success" })
})