import { AI_EXCLUSION_MEGA_REGEX } from "../utils/regex";
import getbranch from "../github-fetch/getbranch";
import getcommit from "../github-fetch/getcommit";
import gettree from "../github-fetch/gettree";
import { getlatestcommit } from "./getlatestcommit";
import { getfiles } from "./getfiles";
import { filterfiles } from "./filterfiles";

type Response = { success: false, message: string, status: number } | { success: true, message: string, RepoContent: string | undefined, mostused: string, treelength: number, status: number, lastcommit: string, treestring: string }

export async function githubrefetch(owner: string, repo: string, branch: string, projectcode: string | undefined, previouscommitid: string | null | undefined): Promise<Response> {


    const res = await getcommit(owner, repo, branch);

    let fullcode: string | undefined = projectcode;

    if (!res.ok) {
        return {
            success: false,
            message: res.status === 422 ? 'no commit found' : 'refetch failed , please try again later',
            status: 404
        }
    }

    const data = await res.json();


    const lastcommit = data.commit.message;

    const commitsha = data.sha;



    if (previouscommitid && commitsha === previouscommitid) {
        return { success: false, message: "Repo is upto date", status: 200 }
    }

    const [branchres, { tree, treestring }, commits] = await Promise.all([
        getbranch(owner, repo),
        gettree(owner, repo, branch),
        getlatestcommit(owner, repo, branch, previouscommitid!)
    ])


    if (!branchres.ok) {
        return { success: false, message: "Couldnt fetch", status: 400 }
    }

    const branchdata = await branchres.json();
    const mostused = branchdata.language;


    const files = await getfiles(commits, owner, repo);
    const ValidFiles = await filterfiles(files)


    const BATCH_SIZE = 15;
    let RepoContent = new Map<string, string>();

    for (let i = 0; i < ValidFiles.length; i += BATCH_SIZE) {
        const paths = ValidFiles.slice(i, i + BATCH_SIZE);

        await Promise.all(paths.map(async (path: string) => {
            const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${commitsha}`, {
                headers: {
                    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                    'User-Agent': 'Codescope-App',
                    'Accept': 'application/vnd.github.v3.raw',
                    'Cache-Control': 'no-cache'
                }
            })

            if (!res.ok) {
                return null;
            }

            const text = await res.text();

            console.log(text);

            RepoContent.set(
                path,
                `------Path : ${path}-----\n\n-----FileName : ${path.split("/")[path.split("/").length - 1]}----\n\n${text}\n\n----End : ${path}----`
            )
        }))
    }




    ValidFiles.forEach((file) => {
        if (projectcode?.includes(`------Path : ${file}-----`)) {


            const startindex = projectcode.indexOf(`------Path : ${file}-----`);
            const endindex = projectcode.indexOf(`----End : ${file}----`)

            if (startindex !== -1 && endindex !== -1) {
                const endlength = `----End : ${file}----`.length;

                const startcode = projectcode.slice(0, startindex);
                const endcode = projectcode.slice(endindex + endlength, projectcode.length - 1);


                const code = RepoContent.get(file);


                fullcode = startcode + code + endcode;

                projectcode = fullcode;

            } else {
                const code = RepoContent.get(file);

                fullcode! += code;

                projectcode = fullcode;
            }
        } else {
            const code = RepoContent.get(file);

            fullcode! += code;

            projectcode = fullcode;
        }
    });

    console.log(fullcode)


    return { success: true, lastcommit, message: "Successfully fetched", mostused, RepoContent: fullcode, treestring, treelength: tree.length, status: 200 }

}