export async function getlatestcommit(owner: string, repo: string, branch: string, previouscommit: string) {
    const commitsres = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?sha=${branch}&per_page=10`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
            "User-Agent": "Codescope-App"
        }
    })

    const commitdata: any[] = await commitsres.json();
    const commits: string[] = [];

    for (let i = 0; i < commitdata.length; i++) {
        if (commitdata[i].commit.message === previouscommit) {
            break;
        } else {
            commits.push(commitdata[i].sha);
        }
    }

    return commits;
}