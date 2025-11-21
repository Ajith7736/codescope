import getcontent from "./getcontent";
import mostusedlang from "./mostused";
import filtertree from "./filtertree";
import gettree from "./gettree";
import getbranch from "./getbranch";
import { GithubTree } from "@/types/type";


type Response = { success: false, message: string, status: number } | { success: true, message: string, RepoContent: string, mostused: string, tree: GithubTree[], status: number }

export default async function github(owner: string, repo: string): Promise<Response> {
    const MAX_FILESIZE = 500 * 1024;
    const MAX_TOTALSIZE = 20 * 1024 * 1024;

    //get main branch name

    const res = await getbranch(owner, repo);

    if (!res.ok) {
        if (res.status === 404) {
            return { success: false, message: "Repo not found", status: 404 }
        } else {
            return { success: false, message: "An Unknown Error Occured!", status: 400 }
        }
    }

    const resdata = await res.json();
    const branch = await resdata.default_branch;

    // get whole tree of the repo

    const tree = await gettree(owner, repo, branch);

    const { totalsize, ValidFiles } = await filtertree(tree, MAX_FILESIZE);

    if (totalsize > MAX_TOTALSIZE) {
        return { success: false, message: "Maximum total file size exceeded", status: 400 }
    }

    const BATCH_SIZE = 15;
    let RepoContent: string = `Repo Name : ${repo}`

    for (let i = 0; i < ValidFiles.length; i += BATCH_SIZE) {

        const batchedfiles = ValidFiles.splice(i, i + BATCH_SIZE);

        const contents = await getcontent(batchedfiles, owner, repo, branch)

        const validcontents = await contents.filter(Boolean);
        RepoContent = validcontents.join("");
    }


    const mostused: string = await mostusedlang(owner, repo)

    return { success: true, message: "success", RepoContent, mostused, tree, status: 200 }
}