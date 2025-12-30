import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { SendEmail } from "./actions/email-actions";
import prisma from "./server/db/db";
import { customSession } from "better-auth/plugins";


export const auth = betterAuth({
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ['google', 'github']
        }
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await SendEmail({
                to: user.email,
                subject: "Verify your email address",
                url,
                name: user.name
            });
        },
        sendOnSignUp: true,
        autoSignInAfterVerification: true
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }
    },
    user: {
        deleteUser: {
            enabled: true
        }
    },
    plugins: [nextCookies(),
    customSession(async ({ user: userdata, session }) => {

        const user = await prisma.user.findUnique({
            where: {
                id: userdata.id
            },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                emailVerified: true,
                name: true,
                image: true,
                razorpay_customer_id: true,
                subscription_end_date: true,
                subscription_status: true,
                accounts: {
                    select: {
                        providerId: true,
                        createdAt: true,
                        accountId: true
                    }
                }
            }
        })


        const subscription = await prisma.subscription.findFirst({
            where: {
                userId: userdata.id,
                status: "active"
            },
            select: {
                id: true,
                planId: true,
                plan: {
                    select: {
                        razorpayPlanId: true,
                        name: true
                    }
                },
                status: true,
                createdAt: true,
                activated_at: true,
                current_end: true,
                paid_count: true,
                remaining_count: true
            }
        })

        return {
            user,
            session,
            subscription,
        };
    }),
    ],
});