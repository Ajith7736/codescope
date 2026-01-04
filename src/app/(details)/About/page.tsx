import BackButton from "@/ui/Buttons/BackButton";

const Page = () => {
    return (
        <div>
            <BackButton href={"/"} className="m-4" />
            <div className="p-5 flex flex-col items-center gap-5">
                <h6 className="text-center text-xs font-extralight text-dark-accent">OUR IDENTITY</h6>
                <h1 className="xss:text-3xl lg:text-5xl font-family-sans font-extrabold text-center">Redefining code intelligence.</h1>
                <p className="text-center text-sm font-family-sans italic text-gray-600">CodeScope AI was founded with a singular mission: to make the analysis of github code easier and help for opensource contributions.</p>
                <div className="flex xss:flex-col md:flex-row justify-center gap-7">
                    <div className="flex flex-col mt-10 gap-5 md:w-[30%]">
                        <h1 className="font-family-mono font-bold">THE VISION</h1>
                        <p className="text-xs italic text-dark-text-muted/50">We believe that as codebases grow, they shouldn't slow down. Complexity is inevitable, but confusion isn't. By leveraging Gemini's deep semantic reasoning, we provide teams with a "second pair of eyes" that understands logic, not just syntax.</p>
                    </div>
                    <div className="flex flex-col mt-10 gap-5 md:w-[30%]">
                        <h1 className="font-family-mono font-bold">THE TECHNOLOGY</h1>
                        <p className="text-xs italic text-dark-text-muted/50">
                            Our engine doesn't just look for patterns. It maps out your entire application's graph, identifies structural weaknesses, and suggests refactors that align with modern best practices—all in real-time.
                        </p>
                    </div>
                </div>
                <div className="border border-dark-border-strong/50 rounded-lg bg-linear-to-bl from-indigo-600/20 via-dark-background to-dark-background p-10  md:w-[60%] mt-10">
                    <h1 className="font-family-sans font-extrabold text-2xl">Build Projects without issues</h1>
                    <p className="text-xs mt-2 text-dark-text-muted/80 italic">
                        CodeScope AI empowers you to focus on building, not debugging. With intelligent analysis and actionable insights, your team can avoid hidden pitfalls and resolve issues before they grow—ensuring smoother, more reliable project delivery.
                    </p>
                </div>
            </div>
        </div>
    )
}


export default Page;