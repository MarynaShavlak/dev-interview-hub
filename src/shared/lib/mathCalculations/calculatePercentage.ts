export const calculatePercentage = (
    part: number,
    total: number,
    decimalPart: number = 2,
): number => {
    return total > 0 ? Number(((part / total) * 100).toFixed(decimalPart)) : 0;
};
