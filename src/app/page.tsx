import { headers } from "next/headers";
import Content from "../features/home/layout/Content";
import Navbar from "../features/home/layout/Navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://codescopegit.vercel.app"),
  title: {
    default: "About | Codescope - AI Powered Code Analysis",
    template: "%s | Codescope",
  },
  description:
    "Learn about Codescope AI: our vision for redefining code intelligence, our technology, and how we're empowering developers and teams to build and contribute to open source with confidence.",
  keywords: [
    "About Codescope",
    "Our mission",
    "AI code analysis",
    "Code intelligence",
    "Open source contribution",
    "Development teams",
    "Software engineering vision",
    "Code review process",
    "static analysis",
    "intelligent code analysis",
    "codescope",
    "purpose",
    "team"
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
    canonical: "https://codescopegit.vercel.app/About",
  },
  openGraph: {
    title: "About Codescope AI",
    description:
      "Discover the mission, technology, and vision behind Codescope AI. We're dedicated to making code analysis smarter, faster, and more accessible for the global developer community.",
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
    title: "About Codescope AI",
    description:
      "Get to know Codescope AI—our journey, our mission, and how we're using AI to empower developers and improve code quality everywhere.",
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
