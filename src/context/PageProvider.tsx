"use client"
import React, { createContext, useContext, useState } from "react";

interface PageProps {
    currentpage: "dashboard" | "analysis" | "projects",
    setcurrentpage: React.Dispatch<React.SetStateAction<"dashboard" | "analysis" | "projects">>
}

const PageContext = createContext<PageProps | undefined>(undefined)

export function PageProvider({ children }: { children: React.ReactNode }) {
    const [currentpage, setcurrentpage] = useState<"dashboard" | "analysis" | "projects">("dashboard")
    return (<PageContext.Provider value={{ currentpage, setcurrentpage }}>
        {children}
    </PageContext.Provider>)
}

export function usePage(){
    const context = useContext(PageContext);
    if(!context) throw new Error("usePage context must be used inside the wrapper");
    return context;
}