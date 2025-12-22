
function IssuesText({ number }: { number: number }) {

    let bg: string = "";

    if (number === 0) {
        bg = "bg-green-500/10 text-green-500 border border-green-500/30"
    } else if (number >= 1 && number <= 5) {
        bg = "bg-blue-500/10 border border-blue-500/30 text-blue-500"
    } else if (number >= 6 && number <= 10) {
        bg = "bg-orange-500/10 border border-orange-500/30 text-orange-500"
    } else if (number >= 11) {
        bg = "bg-red-500/10 border border-red-500/30 text-red-500"
    }

    return (
        <p className={`${bg} xss:text-[9px]  py-1 px-2 `}>
            {number} {number === 1 ? 'issue' : 'issues'}        </p>
    )
}

export default IssuesText
