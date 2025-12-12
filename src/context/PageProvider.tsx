"use client"
import React, { createContext, useContext, useState } from "react";

interface PageProps {
    currentpage: "dashboard" | "analysis" | "projects",
    setcurrentpage: React.Dispatch<React.SetStateAction<"dashboard" | "analysis" | "projects">>
    currentprojectpage: "analysis" | "overview" | "settings",
    setcurrentprojectpage: React.Dispatch<React.SetStateAction<"analysis" | "overview" | "settings">>

}

const PageContext = createContext<PageProps | undefined>(undefined)

export function PageProvider({ children }: { children: React.ReactNode }) {
    const [currentpage, setcurrentpage] = useState<"dashboard" | "analysis" | "projects">("dashboard")
    const [currentprojectpage, setcurrentprojectpage] = useState<"analysis" | "overview" | "settings">("analysis")
    return (<PageContext.Provider value={{ currentpage, setcurrentpage, currentprojectpage, setcurrentprojectpage }}>
        {children}
    </PageContext.Provider>)
}

export function usePage() {
    const context = useContext(PageContext);
    if (!context) throw new Error("usePage context must be used inside the wrapper");
    return context;
}