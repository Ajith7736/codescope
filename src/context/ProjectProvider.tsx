'use client'

import { Project } from "@/types/type"
import { createContext, ReactNode, useContext, useState } from "react"

interface ProjectContextProps {
    projectdata: Project | null,
    setprojectdata: React.Dispatch<React.SetStateAction<Project | null>>
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
    const [projectdata, setprojectdata] = useState<Project | null>(null)
    return <ProjectContext.Provider value={{ projectdata, setprojectdata }}>
        {children}
    </ProjectContext.Provider>
}

export function useProject() {
    const project = useContext(ProjectContext);
    if(!project) throw new Error("useProject context must be used inside provider")
    return project;
}