export const formatMonth = (monthStr: string | number): string => {
    return String(monthStr).padStart(2, '0');
};
