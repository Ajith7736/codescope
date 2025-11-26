import { ProjectProvider } from '@/context/ProjectProvider';
import AnalysisContent from '@/features/dashboard/analysis/components/AnalysisContent'

async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id: string = (await params).id;
    return (
        <>
            <ProjectProvider>
                <AnalysisContent id={id} />
            </ProjectProvider>
        </>
    )
}

export default Page
