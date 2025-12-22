export async function getfiles(commits: string[], owner: string, repo: string) {

    let files: Set<string> = new Set();

    for (let i = 0; i < commits.length; i++) {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${commits[i]}`, {
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
                "User-Agent": "Codescope-App"
            }
        })

        const data = await res.json();

        data.files.map((file: any) => {
            if (!files.has(file.filename)) {
                files.add(file.filename);
            }
        })
    }

    return files;
}