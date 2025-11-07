import { auth } from "@/lib/auth"
import { AppRoute } from "next/dist/build/swc/types"

export interface CardProps {
    logo: React.ReactElement,
    title: string,
    desc: string
}

export interface Providerprops {
    img: React.ReactElement,
    provider: "google" | "github"
}

export type Inputs = {
    name: string,
    email: string,
    password: string
}

export type Signinprops = {
    email : string,
    password : string
}

export type VerifyEmailProps = {
    user : string,
    url : string
}

export interface Linkprops {
    icon : React.ReactElement,
    name : "dashboard" | "analysis" | "projects",
    route : string
}

export interface DashCardProps {
    icon : React.ReactElement,
    number : string,
    title : string,
    style? : string
}

export type Session = typeof auth.$Infer.Session;