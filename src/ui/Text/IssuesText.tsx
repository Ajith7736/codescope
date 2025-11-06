import React from 'react'

function IssuesText({ number }: { number: number }) {

    let bg: string = "";

    if (number === 0) {
        bg = "bg-green-500/40 text-green-400"
    } else if (number >= 1 && number <= 5) {
        bg = "bg-blue-500/40 text-blue-400"
    } else if (number >= 6 && number <= 10) {
        bg = "bg-yellow-500/40 text-yellow-400"
    } else if (number >= 11 && number <= 15) {
        bg = "bg-orange-500/40 text-orange-400"
    }

    return (
        <p className={`${bg} xss:text-xs  py-1 px-2 rounded-full`}>
            {number} issues
        </p>
    )
}

export default IssuesText
