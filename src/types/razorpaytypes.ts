export type RazorpayEventName =
    | "payment.authorized"
    | "payment.captured"
    | "payment.failed"
    | "order.paid"
    | "invoice.paid"
    | "invoice.payment_failed"
    | "subscription.charged"
    | "subscription.activated"
    | "subscription.paused"
    | "subscription.resumed"
    | "subscription.cancelled"
    | "subscription.halted"
    | "subscription.authenticated";

export interface RazorpayWebhookEvent<TPayload = unknown> {
    entity: "event";
    account_id: string;
    event: RazorpayEventName;
    contains: RazorpayEntity[];
    payload: TPayload;
    created_at: number;
}

export type RazorpayEntity =
    | "payment"
    | "order"
    | "invoice"
    | "subscription";

export type RazorpayPayment = {
    id: string;
    entity: "payment";

    amount: number;
    base_amount?: number;
    currency: "INR" | string;

    status:
    | "created"
    | "authorized"
    | "captured"
    | "failed"
    | "refunded";

    order_id?: string | null;
    invoice_id?: string | null;

    international: boolean;
    method: "upi" | "card" | "netbanking" | "wallet" | string;

    amount_refunded: number;
    amount_transferred?: number;
    refund_status?: string | null;

    captured: boolean | "1" | "0";

    description?: string | null;

    card_id?: string | null;
    bank?: string | null;
    wallet?: string | null;
    vpa?: string | null;

    email?: string | null;
    contact?: string | null;

    customer_id?: string | null;
    token_id?: string | null;

    notes?: unknown[];

    fee?: number | null;
    tax?: number | null;

    reward?: unknown | null;

    error_code?: string | null;
    error_description?: string | null;
    error_source?: string | null;
    error_step?: string | null;
    error_reason?: string | null;

    acquirer_data?: {
        rrn?: string;
        upi_transaction_id?: string;
    };

    upi?: {
        vpa: string;
        flow: "intent" | "collect" | string;
    };

    created_at: number;
};

export type RazorpaySubscription = {
    id: string;
    entity: "subscription";

    plan_id: string;

    customer_id: string | null;
    customer_email?: string | null;
    customer_contact?: string | null;

    status:
    | "created"
    | "authenticated"
    | "active"
    | "paused"
    | "cancelled"
    | "completed"
    | "expired";

    current_start: number;
    current_end: number;
    ended_at: number | null;

    quantity: number;

    notes: any;


    charge_at: number;

    start_at: number;
    end_at: number;

    auth_attempts: number;

    total_count: number;
    paid_count: number;
    remaining_count: number;

    customer_notify: boolean;

    created_at: number;

    expire_by: number | null;

    short_url: string | null;

    has_scheduled_changes: boolean;
    change_scheduled_at: number | null;

    source: "api" | "dashboard" | string;

    payment_method: "upi" | "card" | "netbanking" | string;

    offer_id: string | null;
};

export type RazorpayInvoice = {
    id: string;
    entity: "invoice";

    receipt: string | null;
    invoice_number: string | null;

    customer_id: string | null;

    customer_details: {
        id: string | null;
        name: string | null;
        email: string | null;
        contact: string | null;
        gstin: string | null;
        billing_address: unknown | null;
        shipping_address: unknown | null;
        customer_name: string | null;
        customer_email: string | null;
        customer_contact: string | null;
    };

    order_id: string | null;
    subscription_id: string | null;
    payment_id: string | null;

    status:
    | "issued"
    | "paid"
    | "partially_paid"
    | "cancelled"
    | "expired";

    expire_by: number | null;

    issued_at: number | null;
    paid_at: number | null;
    cancelled_at: number | null;
    expired_at: number | null;

    sms_status: string | null;
    email_status: string | null;

    date: number;

    terms: string | null;

    partial_payment: boolean;

    gross_amount: number;
    tax_amount: number;
    taxable_amount: number;

    amount: number;
    amount_paid: number;
    amount_due: number;

    first_payment_min_amount: number | null;

    currency: "INR" | string;
    currency_symbol: string;

    description: string | null;

    notes: any;

    comment: string | null;

    short_url: string | null;

    view_less: boolean;

    billing_start: number | null;
    billing_end: number | null;

    type: "invoice";

    group_taxes_discounts: boolean;

    supply_state_code: string | null;

    subscription_status: string | null;

    user_id: string | null;

    created_at: number;

    idempotency_key: string | null;

    reminder_status: string | null;

    ref_num: string | null;
};

export type RazorpayOrder = {
    id: string;
    entity: "order";

    amount: number;
    amount_paid: number;
    amount_due: number;

    currency: "INR" | string;

    receipt: string | null;
    offer_id: string | null;

    status:
    | "created"
    | "attempted"
    | "paid";

    attempts: number;

    notes: any;

    created_at: number;

    description: string | null;

    checkout: unknown | null;
};


