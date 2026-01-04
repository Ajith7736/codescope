import { z } from "zod"

export const singInSchema = z.object({
    email: z.string().min(1, "This field is required"),
    password: z.string().min(1, "This field is required")
})

export type singInInputs = z.infer<typeof singInSchema>