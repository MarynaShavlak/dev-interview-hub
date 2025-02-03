export const getUniqueStringOptions = <T, K extends keyof T>(
    data: T[],
    field: K,
): string[] => {
    return [...new Set(data.map((item) => item[field] as string))];
};
