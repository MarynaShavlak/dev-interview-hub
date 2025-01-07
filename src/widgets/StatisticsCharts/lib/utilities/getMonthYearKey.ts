import { formatToTwoDigits } from '@/shared/lib/text/formatToTwoDigits/formatToTwoDigits';

export const getMonthYearKey = (date: string): string => {
    const [day, month, year] = date.split('.').map(Number);
    const monthWithZero = formatToTwoDigits(month);
    return `${monthWithZero}/${year}`;
};
