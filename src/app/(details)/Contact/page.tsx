import { Metadata } from "next";
import ContactPage from "./components/ContactPage";

export const metadata: Metadata = {
    metadataBase: new URL("https://codescopegit.vercel.app"),
    title: {
        default: "Contact | Codescope - Get in Touch with Us",
        template: "%s | Codescope",
    },
    description:
        "Contact Codescope AI for questions, support, or feedback. Reach out using the form and I will respond as soon as possible.",
    keywords: [
        "Contact Codescope",
        "Support",
        "Help",
        "Contact form",
        "Developer support",
        "Technical assistance",
        "Codescope AI",
        "Feedback",
        "Communication",
        "Get in touch",
        "Customer support"
    ],
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
    },
    icons: {
        icon: "/favicon.svg",
    },
    alternates: {
        canonical: "https://codescopegit.vercel.app/Contact",
    },
    openGraph: {
        title: "Contact Codescope AI",
        description:
            "Need help or want to share your feedback? Contact Codescope AI and I will assist you promptly.",
        siteName: "codescopegit.vercel.app",
        images: [
            {
                url: "/og-icon.png",
                alt: "Codescope Logo",
                width: 200,
                height: 200,
            },
        ],
        locale: "en_IN",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Codescope AI",
        description:
            "Reach out to the Codescope AI team for assistance, support, or partnership opportunities.",
        site: "@codescopegit",
        creator: "@codescopegit",
        images: [
            {
                url: "/og-icon.png",
                alt: "Codescope Logo",
                width: 200,
                height: 200,
            },
        ],
    },
};


const Page = () => {


    return (
        <>
            <ContactPage />
        </>

    )
}

export default Page;