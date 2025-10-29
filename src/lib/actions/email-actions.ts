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
            <div>
                <h1 style="text-align:center; ">Verify Your Email</h1>
                <p>Thank You for Sign in ${name} Click the button or link below to Verify your account</p>
                <button style="background-color : green; color: white; border: none; padding: 10px; border-radius : 5px; width:200px; height:50px; font-size:16px;  font-weight:bold;">Verify Email</button>
                <p>or if the button didn't work just copy paste the below link</p>
                <a href=${url}>${url}</a>
            </div>
            `
        })
    } catch (err) {
        return { success: false, message: "Some error occured!" }
    }
}