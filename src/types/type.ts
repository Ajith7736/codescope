import { auth } from "@/lib/auth"
import type { Route } from "next"

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
    link : Route,
    name : string
}

export type Session = typeof auth.$Infer.Session;