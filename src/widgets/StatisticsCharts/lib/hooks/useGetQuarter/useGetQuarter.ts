import { useTranslation } from 'react-i18next';

export const useGetQuarter = (month: number): string => {
    const { t } = useTranslation('admin');
    if (month >= 1 && month <= 3) return `${t('Q')}1`;
    if (month >= 4 && month <= 6) return `${t('Q')}2`;
    if (month >= 7 && month <= 9) return `${t('Q')}3`;
    if (month >= 10 && month <= 12) return `${t('Q')}4`;
    return '';
};
