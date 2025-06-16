import { useTranslation } from 'react-i18next';

export const useFieldKey = () => {
    const { t } = useTranslation('english');

    const mapping: Record<string, string> = {
        [t('Ідіома')]: 'text',
        [t('Пояснення')]: 'meaning',
        [t('Переклад')]: 'translation',
    };

    const getFieldKey = (label: string): string => {
        return mapping[label] || 'translation';
    };

    return { getFieldKey };
};
