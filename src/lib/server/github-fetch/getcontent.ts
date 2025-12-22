import { GithubTree } from "@/types/type";

export default async function getcontent(filteredfiles: GithubTree[], owner: string, repo: string, branch: string) {
    const contents = await Promise.all(filteredfiles.map(async (file) => {
        try {

            const res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file.path}`, {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    "User-Agent": "Codescope-App"
                }
            })

            if (!res.ok) {
                return null;
            }

            const filecontent = await res.text();

            return `\n------Path : ${file.path}-----\n\n-----FileName : ${file.path.split("/")[file.path.split("/").length - 1]}----\n\n${filecontent}\n\n----End : ${file.path}----\n\n`;

        } catch (err) {
            console.error("Something went wrong")
            return null;
        }
    }))

    return contents;
}