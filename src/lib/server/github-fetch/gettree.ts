import { GithubTree } from "@/types/type";

export default async function gettree(owner: string, repo: string, branch: string) {
    const treeres = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`)
    const data = await treeres.json();
    const tree: GithubTree[] = await data.tree;

    const treearray = tree.map((item) => {
        return `\n ${item.path} \n`
    })

    const treestring: string = treearray.join("")

    return { tree , treestring};
}