import { RazorpayInvoice, RazorpayOrder, RazorpayPayment, RazorpaySubscription } from "@/types/razorpaytypes";
import prisma from "../db/db";

const Subscriptionstatus_Priority = {
    "CREATED": 0,
    "AUTHENTICATED": 1,
    "ACTIVE": 2,
    "CHARGED": 2,
    "PAUSED": 3,
    "HALTED": 4,
    "CANCELLED": 5
}

export async function handlePaymentCapture(payment: RazorpayPayment) {

    const existingpayment = await prisma.payment.findUnique({
        where: {
            razorpay_payment_id: payment.id
        }
    })

    if (existingpayment) {
        return;
    }

    await prisma.payment.create({
        data: {
            amount: payment?.amount / 100,
            status: payment.status,
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

    const existinginvoice = await prisma.invoice.findUnique({
        where: {
            razorpay_invoice_id: invoice.id
        }
    })

    if (existinginvoice) {
        return
    }

    await prisma.invoice.create({
        data: {
            amount: invoice.amount / 100,
            currency: invoice.currency,
            razorpay_invoice_id: invoice.id,
            razorpay_payment_id: invoice.payment_id,
            status: 'paid',
            paidAt: new Date()
        }
    })

}

export async function handleSubscriptionCharged(subscription: RazorpaySubscription, payment: RazorpayPayment) {
    console.log("\n\n\n\nsubscription charged start\n\n\n\n")
    await prisma.payment.update({
        where: {
            razorpay_payment_id: payment.id
        },
        data: {
            razorpay_subscription_id: subscription.id,
        }
    })

    await prisma.subscription.upsert({
        where: {
            razorpay_subscription_id: subscription.id
        },
        update: {
            charge_at: new Date(subscription.charge_at! * 1000),
            current_start: new Date(subscription.current_start! * 1000),
            current_end: new Date(subscription.current_end * 1000),
            last_payment_at: new Date(),
            userId: subscription.notes.userId,
            planId: subscription.plan_id,
            quantity: subscription.quantity,
            status: "charged",
            remaining_count: subscription.remaining_count,
            paid_count: subscription.paid_count,
        },
        create: {
            razorpay_subscription_id: subscription.id,
            paid_count: subscription.paid_count,
            quantity: subscription.quantity,
            remaining_count: subscription.remaining_count,
            charge_at: new Date(subscription.charge_at! * 1000),
            current_start: new Date(subscription.current_start! * 1000),
            current_end: new Date(subscription.current_end * 1000),
            last_payment_at: new Date(),
            userId: subscription.notes.userId,
            planId: subscription.plan_id,
            status: "charged",
            total_count: subscription.total_count
        }
    })

    await prisma.invoice.update({
        where: {
            razorpay_invoice_id: payment.invoice_id!
        },
        data: {
            razorpay_subscription_id: subscription.id
        }
    })

    console.log("\n\n\n\nsubscription charged finished\n\n\n\n")
}

export async function handleSubscriptionAuthenticated(subscription: RazorpaySubscription) {
    console.log("\n\n\n\nsubscription authentication start\n\n\n\n")
    await prisma.subscription.upsert({
        where: {
            razorpay_subscription_id: subscription.id
        },
        update: {
            status: "authenticated",
            quantity: subscription.quantity,
            paid_count: subscription.paid_count,
            remaining_count: subscription.remaining_count
        },
        create: {
            razorpay_subscription_id: subscription.id,
            quantity: subscription.quantity,
            userId: subscription.notes.userId,
            planId: subscription.plan_id,
            status: "authenticated",
            total_count: subscription.total_count,
            paid_count: subscription.paid_count,
            remaining_count: subscription.remaining_count
        }
    })
    console.log("\n\n\n\nsubscription authentication finished\n\n\n\n")
}

export async function handleSubscriptionActivated(subscription: RazorpaySubscription) {
    console.log("\n\n\n\nsubscription activation start\n\n\n\n")
    await prisma.subscription.upsert({
        where: {
            razorpay_subscription_id: subscription.id
        },
        update: {
            activated_at: new Date(),
            status: "active"
        },
        create: {
            razorpay_subscription_id: subscription.id,
            quantity: subscription.quantity,
            userId: subscription.notes.userId,
            planId: subscription.plan_id,
            status: "active",
            total_count: subscription.total_count,
            paid_count: subscription.paid_count,
            remaining_count: subscription.remaining_count,
            activated_at: new Date(),
        }
    })

    await prisma.user.update({
        where: {
            id: subscription.notes.userId
        },
        data: {
            subscription_status: "active",
            subscription_end_date: new Date(subscription.current_end * 1000)
        }
    })
    console.log("\n\n\n\nsubscription activation finished\n\n\n\n")
}

export async function handlePaymentFailed(payment: RazorpayPayment) {
    await prisma.payment.upsert({
        where: {
            razorpay_payment_id: payment.id
        },
        update: {
            status: "failed",
            error_code: payment.error_code!,
            error_desc: payment.error_description!
        },
        create: {
            razorpay_payment_id: payment.id,
            amount: payment.amount,
            status: "failed",
            email: payment.email,
            currency: payment.contact!,
            error_code: payment.error_code!,
            error_desc: payment.error_description!,
            method: payment.method
        }
    })
}

