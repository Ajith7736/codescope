export default async function mostusedlang(owner: string, repo: string)  : Promise<string> {
    const langres = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "User-Agent": "Codescope-App"
        }
    })

    const languages = await langres.json();
    const mostused: string = Object.keys(languages).reduce((a, b) => languages[a] > languages[b] ? a : b);

    return mostused;
}