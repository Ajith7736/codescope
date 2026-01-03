import { headers } from "next/headers";
import Content from "../features/home/layout/Content";
import Navbar from "../features/home/layout/Navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Codescope - AI Powered GitHub Code Analyzer & Review Tool",
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
    "Codescope",
    "automated code inspection"
  ]
}

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
