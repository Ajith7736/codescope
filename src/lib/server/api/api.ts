import { NextResponse } from "next/server";

export function success(data: any, status = 200) {
    return NextResponse.json({ success: true, ...data }, { status })
}

export function failure(data: any, status = 400) {
    return NextResponse.json({ success: false, ...data }, { status })
}

export function tryCatch(handler: Function) {
    return async (req: Request, ...args: any) => {
        try {
            return await handler(req, ...args);
        } catch (err) {
            console.error(err);
            return failure({ message: "Server Error" })
        }
    }
}