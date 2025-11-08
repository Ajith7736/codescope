import React from 'react'

function IssuesText({ number }: { number: number }) {

    let bg: string = "";

    if (number === 0) {
        bg = "bg-green-500/30 text-green-600"
    } else if (number >= 1 && number <= 5) {
        bg = "bg-blue-500/30 text-blue-600"
    } else if (number >= 6 && number <= 10) {
        bg = "bg-yellow-500/30 text-yellow-600"
    } else if (number >= 11 && number <= 15) {
        bg = "bg-orange-500/30 text-orange-600"
    }

    return (
        <p className={`${bg} xss:text-xs  py-1 px-2 rounded-full`}>
            {number} {number === 1 ? 'issue' : 'issues'}        </p>
    )
}

export default IssuesText
