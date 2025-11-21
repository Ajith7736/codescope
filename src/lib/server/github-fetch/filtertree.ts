import { GithubTree } from "@/types/type";
import { AI_EXCLUSION_MEGA_REGEX } from "../utils/regex";

export default async function filtertree(tree: GithubTree[],MAX_FILESIZE : number) {
    
    let totalsize = 0;

    const ValidFiles = tree.filter((item) => {
        if(item.type !== "blob"){
            return false
        }

        if(AI_EXCLUSION_MEGA_REGEX.test(item.path)){
            return false;
        }

        if(item.size > MAX_FILESIZE){
            return false;
        }

        totalsize += item.size ? item.size : 0

        return true;
    })

    return { ValidFiles , totalsize }
}