import { auth } from "@/lib/auth"
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
    name: "dashboard" | "analysis" | "projects" | "overview",
    route?: string
    css? : string
}

export interface DashCardProps {
    icon: React.ReactElement,
    number: number,
    title: string,
    style?: string
}

export type Session = typeof auth.$Infer.Session;


export interface AnalysisProps {
    icon: React.ReactElement,
    score: number,
    type: string
}

export interface GithubTree {
    path: string,
    mode: string,
    type: "tree" | "blob",
    sha: string,
    size: number,
    url: string,
}

export interface Project {
    id: string;
    projectname: string;
    projectcode: string;
    ownername: string;
    mostused: string;
    totalfiles: number;
    projecttree: string;
    lastcommit: string;
    userId: string;
    createdAt: Date;
    branch: string;
    analysis: Analysis[];
}

export interface Analysis {
    id: string;
    type: "Architecture" | "Security" | "Performance";
    totalissues: number;
    status: string;
    summary?: string | null;
    projectId: string;
    score: number;
    createdAt: Date;
    updatedAt: Date;
    issues: Issues[];
}

export interface Issues {
    id: string;
    severity: "high" | "medium" | "low";
    issuetitle: string;
    issuedesc: string;
    issuelocation: string;
    suggesstedfix: string;
    suggesstedcode?: string;
    suggesstedcodelanguage?: string;
    analysisId: string;
    createdAt: Date;
}


export interface Analysiscontentprops {
    icon: React.ReactElement,
    hover: string,
    active: string,
    type: "Architecture" | "Security" | "Performance"
}

export interface recentanalysis {
    project: {
        projectname: string;
    };
    id: string;
    type: "Architecture" | "Security" | "Performance";
    totalissues: number | null;
}[]



export interface showcodeprops {
    id: string | null,
    show: boolean
}


export interface planadvprops {
    message: string
}

export interface plansprops {
    pricing: string,
    plantype: string,
    plandesc: string,
    planadv: planadvprops[]
}