import { auth } from "@/lib/auth"

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

export type Session = typeof auth.$Infer.Session;