import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Sitemap {
    const baseUrl = "https://codescopegit.vercel.app"
    return [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1
        },
        {
            url: `${baseUrl}/About`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8
        },
        {
            url: `${baseUrl}/Terms`,
            lastModified: new Date("2025-01-04"),
            changeFrequency: "yearly",
            priority: 0.6
        },
        {
            url: `${baseUrl}/Contact`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.6
        }
    ]
}