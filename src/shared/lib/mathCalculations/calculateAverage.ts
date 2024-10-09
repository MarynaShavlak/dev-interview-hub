export const calculateAverage = (
    total: number,
    count: number,
    decimalPart: number = 1,
): number => {
    return count > 0 ? Number((total / count).toFixed(decimalPart)) : 0;
};
