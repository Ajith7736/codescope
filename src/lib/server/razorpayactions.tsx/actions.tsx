import { RazorpayInvoice, RazorpayPayment, RazorpaySubscription } from "@/types/razorpaytypes";
import prisma from "../db/db";

const AllowedTransitions: Record<string, string[]> = {
    created: ['authenticated'],
    authenticated: ['active'],
    active: ['paused', 'halted', 'cancelled', 'completed'],
    paused: ['active', 'cancelled', 'completed'],
    halted: ['active', 'cancelled', 'completed'],
    cancelled: [],
    completed: []
}

function canTransition(from: string, to: string) {
    return AllowedTransitions[from].includes(to);
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
            paidAt: new Date(invoice.paid_at! * 1000)
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

}

export async function handleSubscriptionAuthenticated(subscription: RazorpaySubscription) {


    const previous_subscription = await prisma.subscription.findUnique({
        where: {
            razorpay_subscription_id: subscription.id
        },
        select: {
            status: true
        }
    })

    if (previous_subscription) {
        await prisma.subscription.update({
            where: {
                razorpay_subscription_id: subscription.id
            },
            data: {
                status: canTransition(previous_subscription.status, "authenticated") ? "authenticated" : previous_subscription.status,
                quantity: subscription.quantity,
                paid_count: subscription.paid_count,
                remaining_count: subscription.remaining_count
            }
        })
    } else {
        await prisma.subscription.create({
            data: {
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
    }

}

export async function handleSubscriptionActivated(subscription: RazorpaySubscription) {

    const previous_subscription = await prisma.subscription.findUnique({
        where: {
            razorpay_subscription_id: subscription.id
        },
        select: {
            status: true
        }
    })

    if (previous_subscription) {
        await prisma.subscription.update({
            where: {
                razorpay_subscription_id: subscription.id
            },
            data: {
                activated_at: new Date(),
                status: canTransition(previous_subscription.status, "active") ? "active" : previous_subscription.status
            }
        })
    } else {
        await prisma.subscription.create({
            data: {
                razorpay_subscription_id: subscription.id,
                quantity: subscription.quantity,
                userId: subscription.notes.userId,
                planId: subscription.plan_id,
                status: "active",
                total_count: subscription.total_count,
                paid_count: subscription.paid_count,
                remaining_count: subscription.remaining_count,
                activated_at: new Date()
            }
        })
    }


    await prisma.user.update({
        where: {
            id: subscription.notes.userId
        },
        data: {
            subscription_status: "active",
            subscription_end_date: new Date(subscription.current_end * 1000)
        }
    })
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

export async function handleSubscriptionCancelled(subscription: RazorpaySubscription) {
    await prisma.subscription.update({
        where: {
            razorpay_subscription_id: subscription.id
        },
        data: {
            status: "cancelled",
            cancelled_at: new Date(),
        }
    })

    await prisma.user.update({
        where: {
            razorpay_customer_id: subscription.customer_id!,
        },
        data: {
            subscription_status: "cancelled",
            subscription_end_date: null
        }
    });

}

export async function handleSubscriptionHalted(subscription: RazorpaySubscription) {

    await prisma.subscription.update({
        where: {
            razorpay_subscription_id: subscription.id
        },
        data: {
            halted_at: new Date(),
            status: "halted"
        }
    })

    await prisma.user.update({
        where: {
            razorpay_customer_id: subscription.customer_id!
        },
        data: {
            subscription_status: "halted",
            subscription_end_date: new Date(subscription.current_end * 1000)
        }
    })

}

export async function handleSubscriptionCompleted(subscription: RazorpaySubscription) {

    await prisma.subscription.update({
        where: {
            razorpay_subscription_id: subscription.id
        },
        data: {
            completed_at: new Date(),
            status: "completed"
        }
    })

    await prisma.user.update({
        where: {
            razorpay_customer_id: subscription.customer_id!
        },
        data: {
            subscription_status: "completed",
            subscription_end_date: null
        }
    })

}

export async function handleSubscriptionPaused(subscription: RazorpaySubscription) {

    await prisma.subscription.update({
        where: {
            razorpay_subscription_id: subscription.id
        },
        data: {
            paused_at: new Date(),
            status: "paused"
        }
    })

    await prisma.user.update({
        where: {
            razorpay_customer_id: subscription.customer_id!
        },
        data: {
            subscription_status: "paused",
            subscription_end_date: new Date(subscription.current_end * 1000)
        }
    })

}

export async function handleSubscriptionResumed(subscription: RazorpaySubscription) {

    await prisma.subscription.update({
        where: {
            razorpay_subscription_id: subscription.id
        },
        data: {
            resumed_at: new Date(),
            status: "active"
        }
    })

    await prisma.user.update({
        where: {
            razorpay_customer_id: subscription.customer_id!
        },
        data: {
            subscription_status: "active",
            subscription_end_date: new Date(subscription.current_end * 1000)
        }
    })

}

