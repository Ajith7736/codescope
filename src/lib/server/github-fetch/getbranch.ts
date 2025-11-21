export default async function getbranch(owner: string, repo: string): Promise<Response> {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
            "User-Agent": "Codescope-App"
        }
    })

    return res;
}