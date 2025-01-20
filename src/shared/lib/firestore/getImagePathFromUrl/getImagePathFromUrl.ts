export const getImagePathFromUrl = (url: string): string => {
    const urlObj = new URL(url);
    const pathStart = urlObj.pathname.indexOf('o/') + 2;
    let path = urlObj.pathname.slice(pathStart);
    const queryStart = path.indexOf('?');
    if (queryStart !== -1) {
        path = path.slice(0, queryStart);
    }

    return decodeURIComponent(path);
};
