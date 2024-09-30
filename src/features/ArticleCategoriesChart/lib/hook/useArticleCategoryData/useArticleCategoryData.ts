import { useTranslation } from 'react-i18next';
import { useArticles } from '@/entities/Article';

export interface CategoryData {
    [category: string]: number;
}

export const useArticleCategoryData = () => {
    const { t } = useTranslation('admin');
    const { data: articles, isLoading } = useArticles(null);

    const articleCount: CategoryData = {};
    const viewCount: CategoryData = {};

    articles?.forEach((article) => {
        article.category.forEach((cat) => {
            articleCount[cat] = (articleCount[cat] || 0) + 1;
            viewCount[cat] = (viewCount[cat] || 0) + article.views;
        });
    });

    const labels = Object.keys(articleCount).map((cat) => t(`${cat}`));

    const articleData = Object.values(articleCount);
    const viewData = Object.values(viewCount);

    return {
        isLoading,
        labels,
        articleData,
        viewData,
    };
};
