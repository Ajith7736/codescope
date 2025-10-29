import transporter from "../Mail"

export async function SendEmail({
    to,
    subject,
    url,
    name
}: { to: string, subject: string, url: string, name: string }) {

    try {
        const email = await transporter.sendMail({
            from: `"Codescope" <${process.env.NODEMAILER_USER}> }`,
            to,
            subject,
            html: `
            <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f7f9fb; padding: 30px; text-align: center; color: #333;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 40px 30px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
                <h1 style="color: #2c3e50; font-size: 28px; margin-bottom: 10px;">Verify Your Email</h1>
                <p style="font-size: 16px; color: #555; margin-bottom: 30px;">
                Thank you for signing up, <strong>${name}</strong>!<br>
                Please click the button below to verify your account and complete your registration.
                </p>
                <a href="${url}" target="_blank" style="display: inline-block; background-color: #22c55e; color: white; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-size: 16px; font-weight: bold;">
                Verify Email
                </a>
                <p style="margin-top: 25px; color: #777; font-size: 14px;">
                If the button above doesn’t work, copy and paste this link into your browser:
                </p>
                <p style="word-wrap: break-word; color: #007bff; font-size: 14px;">
                <a href="${url}" target="_blank" style="color: #007bff; text-decoration: none;">${url}</a>
                </p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
                © ${new Date().getFullYear()} Codescope. All rights reserved.
            </p>
            </div>
            `
        })

        if (email.accepted.length > 0) {
            return { success: true, message: "Email sent successfully" }
        } else {
            return { success: false, message: "Email couldnt sent!" }
        }

    } catch (err) {
        return { success: false, message: "Some error occured!" }
    }
}