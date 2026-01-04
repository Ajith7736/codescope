import BackButton from "@/ui/Buttons/BackButton";
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

const Page = () => {
    return (
        <div>
            <BackButton href={"/"} className="m-4" />
            <div className="p-5 flex flex-col items-center gap-5">
                <h6 className="text-center text-xs font-extralight text-dark-accent">OUR IDENTITY</h6>
                <h1 className="xss:text-3xl lg:text-5xl font-family-sans font-extrabold text-center">Redefining code intelligence.</h1>
                <p className="text-center text-sm font-family-sans italic text-gray-600">CodeScope AI was founded with a singular mission: to make the analysis of github code easier and help for opensource contributions.</p>
                <div className="flex xss:flex-col md:flex-row justify-center gap-7">
                    <div className="flex flex-col mt-10 gap-5 md:w-[30%]">
                        <h1 className="font-family-mono font-bold">THE VISION</h1>
                        <p className="text-xs italic text-dark-text-muted/50">We believe that as codebases grow, they shouldn't slow down. Complexity is inevitable, but confusion isn't. By leveraging Gemini's deep semantic reasoning, we provide teams with a "second pair of eyes" that understands logic, not just syntax.</p>
                    </div>
                    <div className="flex flex-col mt-10 gap-5 md:w-[30%]">
                        <h1 className="font-family-mono font-bold">THE TECHNOLOGY</h1>
                        <p className="text-xs italic text-dark-text-muted/50">
                            Our engine doesn't just look for patterns. It maps out your entire application's graph, identifies structural weaknesses, and suggests refactors that align with modern best practices—all in real-time.
                        </p>
                    </div>
                </div>
                <div className="border border-dark-border-strong/50 rounded-lg bg-linear-to-bl from-indigo-600/20 via-dark-background to-dark-background p-10  md:w-[60%] mt-10">
                    <h1 className="font-family-sans font-extrabold text-2xl">Build Projects without issues</h1>
                    <p className="text-xs mt-2 text-dark-text-muted/80 italic">
                        CodeScope AI empowers you to focus on building, not debugging. With intelligent analysis and actionable insights, your team can avoid hidden pitfalls and resolve issues before they grow—ensuring smoother, more reliable project delivery.
                    </p>
                </div>
            </div>
        </div>
    )
}


export default Page;