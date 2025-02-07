import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useAdminTabs = () => {
    const { t } = useTranslation('admin');

    return useMemo(() => {
        return [
            { value: 'charts', label: t('Інфографіка') },
            { value: 'table', label: t('Таблиця даних про користувачів') },
        ];
    }, [t]);
};
