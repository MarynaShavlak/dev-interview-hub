import { formatMonth } from '@/shared/lib/text/formatMonth/formatMonth';

export const getMonthYearKey = (date: string): string => {
    const [day, month, year] = date.split('.').map(Number);
    const monthWithZero = formatMonth(month);
    return `${monthWithZero}/${year}`;
};
