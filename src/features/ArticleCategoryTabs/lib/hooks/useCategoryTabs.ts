import { useTranslation } from 'react-i18next';
import { ArticleCategory } from '@/entities/Article';
import { TabItem } from '@/shared/ui/deprecated/Tabs';

export const useCategoryTabs = () => {
    const { t } = useTranslation('articles');
    return [
        {
            value: ArticleCategory.ALL,
            content: t('Вcі статті'),
        },
        {
            value: ArticleCategory.IT,
            content: t('IT'),
        },
        {
            value: ArticleCategory.ECONOMICS,
            content: t('Економіка'),
        },
        {
            value: ArticleCategory.SOCIOLOGY,
            content: t('Соціологія'),
        },
        {
            value: ArticleCategory.PUBLIC_ADMINISTRATION,
            content: t('Публічне адміністрування'),
        },
    ] as TabItem[];
};
