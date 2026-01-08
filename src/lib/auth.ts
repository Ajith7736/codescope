import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { SendEmail } from "./actions/email-actions";
import prisma from "./server/db/db";
import { customSession } from "better-auth/plugins";
import { getActiveUserSubscription, getUserdata } from "./server/user/user-helper";


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

        const [user, subscription] = await Promise.all([getUserdata(userdata.id), getActiveUserSubscription(userdata.id)])

        await prisma.usage.upsert({
            where: {
                userId: userdata.id
            },
            update: {},
            create: {
                userId: userdata.id,
                Projectlimit: 1
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