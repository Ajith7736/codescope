import { z } from "zod"

export const signupSchema = z.object({
    name: z.string().min(1, "This field is required"),
    email: z.email("Invalid email address").min(1, "This field is required"),
    password: z.string()
        .min(8, "Password must be 8 character long.")
        .regex(/[a-z]/, "Password must include at least one lowercase letter")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter")
        .regex(/[0-9]/, "Password must include at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include at least one special character")
})

export type signuptype = z.infer<typeof signupSchema>