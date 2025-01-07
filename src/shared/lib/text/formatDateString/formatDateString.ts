import { formatToTwoDigits } from '../formatToTwoDigits/formatToTwoDigits';

export const formatDateString = (dateString: string): string => {
    const desiredFormatRegex = /^\d{2}\.\d{2}\.\d{4}$/;

    if (desiredFormatRegex.test(dateString)) {
        return dateString;
    }
    const date = new Date(dateString);

    const day = formatToTwoDigits(String(date.getUTCDate()));
    const month = formatToTwoDigits(String(date.getUTCMonth() + 1));
    const year = date.getUTCFullYear();

    return `${day}.${month}.${year}`;
};
