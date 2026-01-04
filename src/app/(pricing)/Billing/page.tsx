import { PricingContent } from '@/features/pricing/components/PricingContent'


import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://codescopegit.vercel.app"),
  title: {
    default: "Billing & Pricing | Codescope - Flexible Plans for Developers",
    template: "%s | Codescope",
  },
  description:
    "Discover Codescope's flexible pricing plans for AI-powered code analysis. Choose the plan that fits your needs and upgrade your code review process today.",
  keywords: [
    "Codescope Pricing",
    "Billing",
    "Subscription",
    "Plans",
    "AI code analysis pricing",
    "Developer pricing",
    "Premium",
    "Upgrade",
    "Code review plans",
    "Payment options",
    "Flexible billing",
    "codescope",
    "pricing page"
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
    canonical: "https://codescopegit.vercel.app/Billing",
  },
  openGraph: {
    title: "Codescope Billing & Pricing",
    description:
      "View Codescope's affordable AI-powered code analysis pricing plans. Choose your ideal plan and supercharge your code reviews.",
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
    title: "Codescope Billing & Pricing",
    description:
      "Explore Codescope's flexible plans for AI-driven code review. Find the perfect fit for your development workflow.",
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

async function Page() {

    return (
        <div>
            <PricingContent />
        </div>
    )
}

export default Page
