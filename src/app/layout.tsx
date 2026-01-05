import {  Inter, JetBrains_Mono, Texturina } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Metadata } from "next";


const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-jetbrains',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const bebas = Texturina({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-bebas'
});

export const metadata: Metadata = {
  title: {
    default: "Codescope – AI GitHub Code Analyzer",
    template: "%s | Codescope",
  },
  description:
    "Codescope is an AI-powered GitHub code analyzer that detects security, architecture, and performance issues in repositories.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jetBrainsMono.variable} ${inter.variable} ${bebas.variable}`}>
      <body suppressHydrationWarning
        className={`${jetBrainsMono.className} antialiased bg-light-background dark:bg-dark-background`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

