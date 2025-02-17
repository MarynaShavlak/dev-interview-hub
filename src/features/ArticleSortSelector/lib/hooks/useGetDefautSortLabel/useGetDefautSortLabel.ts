import { useTranslation } from 'react-i18next';
import { ArticleSort } from '@/entities/Article';

export const useGetDefaultSortLabel = (sort: ArticleSort) => {
    const { t } = useTranslation('articles');
    switch (sort) {
        case 'title':
            return t('назві');
        case 'createdAt':
            return t('даті створення');
        case 'views':
            return t('переглядам');
        default:
            return t('назві');
    }
};
