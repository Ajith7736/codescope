"use server"

import { headers } from "next/headers";
import { auth } from "../auth"
import { betterAuth } from "better-auth";
import { redirect } from "next/navigation";




export const signUp = async (email: string, password: string, name: string): Promise<{ success: boolean, message: string }> => {
    try {
        await auth.api.signUpEmail({
            body: {
                email, password, name, callbackURL: "/Dashboard"
            }
        })
        return { success: true, message: "Signed Up Successfully" };

    } catch (error) {
        const e = error as Error
        return {
            success: false,
            message: e.message || "An unknown error occuered"
        }
    }

}

export const signIn = async (email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email, password, callbackURL: "/Dashboard"
            }
        })
        return { success: true, message: "Signed In Successfully" };
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            message: { error: e.message || "An unknown error occuered" }
        }
    }
}


// export const EmailVerification = betterAuth({
//     emailVerification: {
//         sendVerificationEmail: async ({ user, url, token }, requuest) => {
//             await sendEmail
//         }
//     }
// })


export const signOut = async () => {
    await auth.api.signOut({
        headers: await headers()
    })
}