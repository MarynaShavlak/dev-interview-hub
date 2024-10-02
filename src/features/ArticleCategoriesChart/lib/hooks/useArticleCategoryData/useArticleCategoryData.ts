import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useArticles } from '@/entities/Article';
import { Data } from '../../../../ArticleCommentsCharts/model/types/charts';

export const useArticleCategoryData = () => {
    const { t } = useTranslation('admin');
    const { data: articles, isLoading } = useArticles(null);

    const { articleCount, viewCount } = useMemo(() => {
        const articleCount: Data = {};
        const viewCount: Data = {};

        articles?.forEach((article) => {
            article.category.forEach((cat) => {
                articleCount[cat] = (articleCount[cat] || 0) + 1;
                viewCount[cat] = (viewCount[cat] || 0) + article.views;
            });
        });

        return { articleCount, viewCount };
    }, [articles]);

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
