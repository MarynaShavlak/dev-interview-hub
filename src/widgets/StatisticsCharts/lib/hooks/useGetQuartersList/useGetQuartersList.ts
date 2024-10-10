import { useTranslation } from 'react-i18next';

const useGetQuartersList = () => {
    const { t } = useTranslation('admin');
    return Array.from({ length: 4 }, (_, index) => `${t('Q')}${index + 1}`);
};
