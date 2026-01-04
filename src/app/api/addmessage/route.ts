import { tryCatch } from "@/lib/server/api/api";

export const POST = tryCatch(async (req : Request) => {
    const data  = await req.json();
})