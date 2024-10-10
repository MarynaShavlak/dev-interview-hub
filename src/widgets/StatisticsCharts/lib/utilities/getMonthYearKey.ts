export const getMonthYearKey = (date: string): string => {
    const [day, month, year] = date.split('.').map(Number);
    const monthWithZero = String(month).padStart(2, '0');
    return `${monthWithZero}/${year}`;
};
