import { Linkprops } from "@/types/type";
import { ChartLine, ClipboardList, Computer, CreditCard, LayoutDashboard, Settings } from "lucide-react";

export const Links: Linkprops[] = [
    {
        icon: <LayoutDashboard className='xss:size-4 md:size-5' />,
        name: "dashboard",
        route: "/Dashboard"
    }, {
        icon: <Computer className='xss:size-4 md:size-5' />,
        name: "projects",
        route: "/Dashboard/Projects"
    }, {
        icon: <CreditCard className='xss:size-4 md:size-5' />,
        name: "billing",
        route: "/Pricing"
    }
]

export const ProductLink: Linkprops[] = [
    {
        icon: <LayoutDashboard className='xss:size-4 md:size-5' />,
        name: "dashboard",
        route: "/Dashboard"
    }, {
        icon: <Computer className='xss:size-4 md:size-5' />,
        name: "projects",
        route: "/Dashboard/Projects"
    }, {
        icon: <ChartLine className='xss:size-4 md:size-5' />,
        name: "analysis",
    }, {
        icon: <ClipboardList className='xss:size-4 md:size-5' />,
        name: "overview",
    }, {
        icon: <Settings className='xss:size-4 md:size-5' />,
        name: "settings"
    }
]