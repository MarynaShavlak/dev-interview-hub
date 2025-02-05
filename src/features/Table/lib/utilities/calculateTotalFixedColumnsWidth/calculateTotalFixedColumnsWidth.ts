export const calculateTotalFixedColumnsWidth = (
    widthParams: Record<string, number>,
) => Object.values(widthParams).reduce((sum, width) => sum + width, 0);
