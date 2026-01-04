import { MetadataRoute } from "next";

export default function robots() : MetadataRoute.Robots {
    const baseUrl = "https://codescopegit.vercel.app"
    return {
        rules : {
            userAgent: "*",
            allow : ["/","/About"],
            disallow : ["/Terms","/Contact","/api/","/Signup","/Signup/","/SignIn","/SignIn/","/Dashboard/","/Dashboard","/Billing"]
        },
        sitemap : `${baseUrl}/sitemap.xml`
    }
}