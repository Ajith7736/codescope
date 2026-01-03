export const questions: {
    id: string,
    question: string,
    answer: string
}[] = [
        {
            id: crypto.randomUUID(),
            question: "Does Codescope AI analyze private repo",
            answer: "No, currently codescope can only analyze public repos."
        },
        {
            id: crypto.randomUUID(),
            question: "What languages does Codescope AI support?",
            answer: "Codescope AI currently supports popular languages like JavaScript, TypeScript, Python and Java for code analysis."
        },
        {
            id: crypto.randomUUID(),
            question: "Can I use Codescope AI for commercial projects?",
            answer: "Yes, you can use Codescope AI for both personal and commercial projects"
        },
        {
            id: crypto.randomUUID(),
            question: "Is there a limit to the number of repositories I can analyze?",
            answer: "Yes, there is a limit on the number of public repositories you can analyze according to the plan you have."
        },
        {
            id: crypto.randomUUID(),
            question: "How does Codescope AI ensure my code remains private?",
            answer: "Codescope AI does not retain or share your code. Analysis is performed securely, and only public repositories can be processed."
        }
    ]
