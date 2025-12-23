export const delay = (t? : number): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, t ? t : 
        2000);
    })
}