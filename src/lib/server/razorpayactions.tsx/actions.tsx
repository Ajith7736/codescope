import { RazorpayInvoice, RazorpayOrder, RazorpayPayment, RazorpaySubscription } from "@/types/razorpaytypes";
import prisma from "../db/db";

export async function handlePaymentCapture(payment: RazorpayPayment) {
    await prisma.payment.create({
        data: {
            amount: payment?.amount / 100,
            status: "CAPTURED",
            razorpay_payment_id: payment?.id,
            email: payment.email,
            contact: payment.contact,
            error_code: payment.error_code,
            error_desc: payment.error_description,
            currency: payment.currency,
            method: payment.method
        }
    })
}

export async function handleInvoice(invoice: RazorpayInvoice) {
    console.log(invoice);

    await prisma.subscription.upsert({
        where: {
            razorpay_subscription_id: invoice.subscription_id!,
        },
        update: {},
        create: {
            razorpay_subscription_id: invoice.subscription_id!,
            status: "PENDING",
            paid_count: 0,
            quantity: 0,
            remaining_count: 0,
            activated_at: new Date(),
            userId: invoice.notes.userId,
            planId: invoice.notes.planId
        }
    })

    await prisma.invoice.create({
        data: {
            amount: invoice.amount / 100,
            currency: invoice.currency,
            razorpay_invoice_id: invoice.id,
            razorpay_payment_id: invoice.payment_id,
            status: 'paid',
            paidAt: new Date(),
            razorpay_subscription_id: invoice.subscription_id!,
        }
    })

}

export async function handleSubscriptionCharged(subscription: RazorpaySubscription, payment: RazorpayPayment) {
    await prisma.payment.update({
        where: {
            razorpay_payment_id: payment.id
        },
        data: {
            razorpay_subscription_id: subscription.id,
        }
    })

}

