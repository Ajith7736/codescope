export default async function (owner: string, repo: string, branch: string) {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${branch}`,{
        headers : {
            Authorization : `token ${process.env.GITHUB_TOKEN}`,
            "User-Agent" : "Codescope-App"
        }
    })

    return res;
}