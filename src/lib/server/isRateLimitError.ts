export default function isRateLimitError(err: any) {
    if (!err) return false

    const msg = err.message?.toLowerCase() || "";

    return (
        err.status === 429 ||
        msg.includes("rate limit") ||
        msg.includes("quota") ||
        msg.includes("exceeded") ||
        msg.includes("resource") && msg.includes("exhausted")
    )
}