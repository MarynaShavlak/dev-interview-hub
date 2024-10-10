import { formatMonth } from '@/shared/lib/text/formatMonth/formatMonth';

export const generateMonths = (): string[] => {
    return Array.from({ length: 12 }, (_, i) => formatMonth(i + 1));
};
