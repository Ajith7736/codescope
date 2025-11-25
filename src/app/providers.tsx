"use client"

import { PageProvider } from "@/context/PageProvider";
import { ProjectProvider } from "@/context/ProjectProvider";
import SidebarProvider from "@/context/SidebarProvider";
import ToastWrapper from "@/lib/ToastWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    const queryclient = new QueryClient();
    return (
        <QueryClientProvider client={queryclient}>
            <SidebarProvider>
                <ProjectProvider>
                    <ThemeProvider defaultTheme="system" attribute="class">
                        <PageProvider>
                            <ToastWrapper>
                                {children}
                            </ToastWrapper>
                        </PageProvider>
                    </ThemeProvider>
                </ProjectProvider>
            </SidebarProvider>
        </QueryClientProvider >
    )
}