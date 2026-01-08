import React, { SetStateAction } from "react";

type Setter = React.Dispatch<React.SetStateAction<string>>

export default function githublinkchecker(link: string, setError: Setter, setRepo: Setter, setOwner: Setter) {
    const urls = link.split("/");
    const owner = urls[urls.length - 2]
    const repo = urls[urls.length - 1]
    if (urls.length > 5) {
        setError("Invalid Link")
    } else if (owner.includes("github.com") || !owner) {
        setError("Invalid Link")
    } else if (repo.includes("github.com") || !repo) {
        setError("Invalid Link")
    } else {
        setError("")
        setOwner(owner);
        setRepo(repo);
    }
}