"use server"

import { headers } from "next/headers";
import { auth } from "../auth"
import { success } from "zod";


export const signUp = async (email: string, password: string, name: string): Promise<{ success: boolean, message: string }> => {
    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
                callbackURL: "/Dashboard"
            }
        })
        return {
            success: true,
            message: "Credential Added \n Verification Email Sent to your Email"
        }
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
            message: e.message || "An unknown error occuered"
        }
    }
}



export const signOut = async () => {
    await auth.api.signOut({
        headers: await headers(),
    })
}


export const UnlinkAccount = async (providerId: string, accountId: string) => {
    try {
        await auth.api.unlinkAccount({
            body: {
                providerId,
                accountId
            },
            headers: await headers()
        })

        return {
            success: true,
            message: "Successfully unlinked your account"
        }
    } catch (erorr) {
        const e = erorr as Error;
        return {
            success: false,
            message: e.message || "Failed to unlink"
        }
    }
}




