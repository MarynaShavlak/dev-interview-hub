import { useTranslation } from 'react-i18next';
import { ArticleCategory } from '@/entities/Article';
import { TabItem } from '@/shared/ui/deprecated/Tabs';

/**
 * Custom hook for retrieving localized article category tabs.
 * Utilizes the `useTranslation` hook from `react-i18next` to provide localized content.
 *
 * @returns {TabItem[]} An array of article category tabs where each tab contains:
 *  * `value`: A string representing the article category.
 *  * `content`: A localized string representing the category label in Ukrainian.
 *
 */

export const useCategoryTabs = () => {
    const { t } = useTranslation('articles');
    return [
        {
            value: ArticleCategory.IT,
            label: t('IT'),
        },
        {
            value: ArticleCategory.HTML,
            label: t('HTML'),
        },
        {
            value: ArticleCategory.CSS,
            label: t('CSS'),
        },
        {
            value: ArticleCategory.REACT,
            label: t('React'),
        },
        {
            value: ArticleCategory.JAVASCRIPT,
            label: t('JavaScript'),
        },
        {
            value: ArticleCategory.TYPESCRIPT,
            label: t('TypeScript'),
        },
    ] as TabItem[];
};
