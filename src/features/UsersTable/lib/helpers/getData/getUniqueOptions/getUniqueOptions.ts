export const getUniqueOptions = <T, K extends keyof T>(
    data: T[],
    field: K,
): (string | T[K])[] => {
    return [...new Set(data.map((item) => item[field] as string | T[K]))];
};
