import getcontent from "./getcontent";
import filtertree from "./filtertree";
import gettree from "./gettree";
import getbranch from "./getbranch";
import getcommit from "./getcommit";



type Response = { success: false, message: string, status: number } | { success: true, message: string, RepoContent: string, mostused: string, treelength: number, status: number, lastcommit: string, treestring: string, branch: string, commitid: string }

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

    const mostused = resdata.language;



    const [commitres, { tree, treestring }] = await Promise.all([
        //get last commit message
        getcommit(owner, repo, branch),


        // get whole tree of the repo
        gettree(owner, repo, branch),
    ])


    if (!commitres.ok) {
        return { success: false, message: "Failed to fetch please try again", status: 400 }
    }

    const commit = await commitres.json();

    const lastcommit = commit.commit.message
    const commitid = commit.sha;


    const treelength = tree.length;
    const { totalsize, ValidFiles } = await filtertree(tree, MAX_FILESIZE);

    if (totalsize > MAX_TOTALSIZE) {
        return { success: false, message: "Maximum total file size exceeded", status: 400 }
    }

    const BATCH_SIZE = 15;
    let RepoContent: string = `Repo Name : ${repo}`

    for (let i = 0; i < ValidFiles.length; i += BATCH_SIZE) {

        const batchedfiles = ValidFiles.slice(i, i + BATCH_SIZE);

        const contents = await getcontent(batchedfiles, owner, repo, branch)

        const validcontents = await contents.filter(Boolean);

        RepoContent += validcontents.join("");
    }


    return { success: true, message: "success", RepoContent, mostused, treelength, status: 200, lastcommit, treestring, branch, commitid }
}