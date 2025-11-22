import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";


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
    <html lang="en" suppressHydrationWarning  className={`${jetBrainsMono.variable} ${inter.variable}`}>
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

