export const getMonthYearKey = (date: string): string => {
    const [day, month, year] = date.split('.').map(Number);
    return `${month}/${year}`;
};
