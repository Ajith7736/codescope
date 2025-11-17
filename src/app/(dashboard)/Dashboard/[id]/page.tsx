import AnalysisContent from '@/features/dashboard/analysis/components/AnalysisContent'

async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return (
        <>
            <AnalysisContent id={id} />
        </>
    )
}

export default Page
