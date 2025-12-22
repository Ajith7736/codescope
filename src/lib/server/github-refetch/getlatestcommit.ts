export async function getlatestcommit(owner: string, repo: string, branch: string, previouscommitid: string) {
    const commitsres = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?sha=${branch}&per_page=10`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
            "User-Agent": "Codescope-App"
        }
    })

    const commitdata: any[] = await commitsres.json();
    const commits: string[] = [];

    for (let i = 0; i < commitdata.length; i++) {
        if (commitdata[i].sha === previouscommitid) {
            break;
        } else {
            commits.push(commitdata[i].sha);
        }
    }

    console.log(commits);

    return commits;
}