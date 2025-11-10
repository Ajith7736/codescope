import { auth } from "@/lib/auth"
import { AppRoute } from "next/dist/build/swc/types"
import React from "react"

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
    email: string,
    password: string
}

export type VerifyEmailProps = {
    user: string,
    url: string
}

export interface Linkprops {
    icon: React.ReactElement,
    name: "dashboard" | "analysis" | "projects",
    route: string
}

export interface DashCardProps {
    icon: React.ReactElement,
    number: string,
    title: string,
    style?: string
}

export type Session = typeof auth.$Infer.Session;

export interface AnalysisProps {
    icon: React.ReactElement,
    score: number,
    type: string
}

export interface GithubRepoItem {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string | null;
    type: "file" | "dir" | "symlink" | "submodule";
    _links: {
        self: string;
        git: string;
        html: string;
    };
}
