import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useMyArticlesTabs = () => {
    const { t } = useTranslation('admin');

    return useMemo(() => {
        return [
            { value: 'queue', label: t('Питання у черзі') },
            { value: 'ready', label: t('Мої статті') },
        ];
    }, [t]);
};
