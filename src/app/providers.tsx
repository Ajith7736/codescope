"use client"

import { PageProvider } from "@/context/PageProvider";
import ToastWrapper from "@/lib/ToastWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    const queryclient = new QueryClient();
    return (
        <QueryClientProvider client={queryclient}>
            <ThemeProvider defaultTheme="system" attribute="class">
                <PageProvider>
                    <ToastWrapper>
                        {children}
                    </ToastWrapper>
                </PageProvider>
            </ThemeProvider>
        </QueryClientProvider >
    )
}