import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ToastWrapper from "@/lib/ToastWrapper";
import { PageProvider } from "@/context/PageProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers } from "./providers";



const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-jetbrains',
});




export const metadata: Metadata = {
  title: "Codescope",
  description: "AI powered web application for code analysis",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jetBrainsMono.className} antialiased bg-light-white dark:bg-dark-black`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

