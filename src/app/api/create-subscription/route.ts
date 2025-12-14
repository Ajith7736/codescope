import { failure, success, tryCatch } from "@/lib/server/api/api"
import prisma from "@/lib/server/db/db";
import Razorpay from "razorpay"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const POST = tryCatch(async (req: Request) => {
    const { planId, userId } = await req.json();

    if (!planId) {
        return failure({ message: "plan id is required" })
    }

    const userdata = await prisma.user.findUnique({
        where : {
            id : userId
        },
        select : {
            email : true,
            name : true
        }
    })

    const subscription = await razorpay.subscriptions.create({
        plan_id: planId,
        total_count: 12,
        customer_notify: 1,
        notify_info : {
            notify_email : userdata?.email
        }
    })

    console.log(subscription);


    return success({ id: subscription.id, key: process.env.RAZORPAY_KEY_ID, entity: subscription.entity });
})