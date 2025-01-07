import { formatToTwoDigits } from '@/shared/lib/text/formatToTwoDigits/formatToTwoDigits';

export const generateMonths = (): string[] => {
    return Array.from({ length: 12 }, (_, i) => formatToTwoDigits(i + 1));
};
