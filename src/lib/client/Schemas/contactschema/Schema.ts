import z from "zod"

const required = "This field is required"

export const contactformschema = z.object({
    fullname: z.string().min(1, required),
    email: z.email("Please enter a valid Email").min(1, "This field is required"),
    subject: z.string().min(1, required),
    message: z.string().min(1, required)
})

export type contactInputs = z.infer<typeof contactformschema>