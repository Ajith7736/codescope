import React, { createContext, ReactNode, useContext, useState } from "react";

interface Sidebarprops {
    showsidebar: boolean,
    setshowsidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = createContext<Sidebarprops | undefined>(undefined)

export default function SidebarProvider({ children }: { children: ReactNode }) {
    const [showsidebar, setshowsidebar] = useState(false);
    return <SidebarContext.Provider value={{ showsidebar, setshowsidebar }}>
        {children}
    </SidebarContext.Provider>
}
export function useSidebar(){
    const Sidebar = useContext(SidebarContext);
    if(!Sidebar) throw new Error("Use the hook inside the provider")
    return Sidebar;
}