import { headers } from "next/headers";
import Content from "../features/home/layout/Content";
import Navbar from "../features/home/layout/Navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";


export const metadata: Metadata = {
  metadataBase: new URL("https://codescopegit.vercel.app"),
  title: {
    default: "Codescope - AI Powered GitHub Code Analyzer & Review Tool",
    template: '%s | Codescope'
  },
  description: "Codescope is an AI-powered GitHub code analyzer and review tool. Instantly scan your repositories for security, architecture and performance issues.",
  keywords: [
    "GitHub Analyzer",
    "AI code analysis",
    "code review",
    "repository insights",
    "code quality",
    "static analysis",
    "code scanner",
    "security vulnerabilities",
    "architecture analysis",
    "performance analysis",
    "AI-powered code review",
    "codescopegit",
    "codescope",
    "automated code inspection",
    "best github analyzer"
  ],
  icons: {
    icon: "/favicon.svg"
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },
  alternates: {
    canonical: "https://codescopegit.vercel.app",
  },
  openGraph: {
    title: "Codescope - AI Powered GitHub Code Analyzer & Review Tool",
    description: "Codescope is an AI-powered GitHub code analyzer and review tool. Instantly scan your repositories for security, architecture and performance issues.",
    siteName: "codescopegit.vercel.app",
    images: [
      {
        url: "/og-icon.png",
        alt: "Codescope Logo",
        width: 200,
        height: 200,
      }
    ],
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Codescope - AI Powered GitHub Code Analyzer & Review Tool",
    description: "Codescope is an AI-powered GitHub code analyzer and review tool. Instantly scan your repositories for security, architecture and performance issues.",
    site: "@codescopegit",
    creator: "@codescopegit",
    images: [
      {
        url: "/og-icon.png",
        alt: "Codescope Logo",
        width: 200,
        height: 200,
      }
    ]
  },
  verification: {
    google: "t3-IvRLMvCUnUgA8RFPb_9rBchvqIlaIFnr1qYqJY94"
  }
};

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/Dashboard")
  }

  return (
    <div className="dark:text-dark-white dark:bg-dark-black">
      <Navbar />
      <Content session={session} />
    </div>
  );
}
