import SidebarProvider from "@/context/SidebarProvider";
import ClientLayout from "./ClientLayout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        redirect("/Signup")
    }

    return (
        <SidebarProvider>
            <ClientLayout>
                {children}
            </ClientLayout>
        </SidebarProvider>
    )
}