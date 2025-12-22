import { AI_EXCLUSION_MEGA_REGEX } from "../utils/regex";

export async function filterfiles(files: Set<string>): Promise<string[]> {

    const ValidFiles: string[] = [...files].filter((item: string) => {
        if (AI_EXCLUSION_MEGA_REGEX.test(item)) {
            return false;
        }

        return true;
    })

    return ValidFiles;

}