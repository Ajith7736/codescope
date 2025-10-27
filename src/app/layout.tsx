import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";


const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-jetbrains',
});


export const metadata: Metadata = {
  title: "Codescope",
  description: "AI powered web application for code analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jetBrainsMono.className} antialiased bg-light-white dark:bg-dark-black`}
      >
        <ThemeProvider defaultTheme="system" attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
