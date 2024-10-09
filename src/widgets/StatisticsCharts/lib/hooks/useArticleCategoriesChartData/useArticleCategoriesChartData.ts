import { ArticleStats } from '../../../model/types/stats';
import { ArticleCategoriesChartsProps } from '@/features/ArticleCategoriesCharts';

export const useArticleCategoriesChartData = (
    categoryData: Record<string, ArticleStats>,
): ArticleCategoriesChartsProps => {
    const labels: string[] = [];
    const viewsByCategories: number[] = [];
    const articlesByCategories: number[] = [];

    Object.entries(categoryData).forEach(
        ([category, { viewCount, articleCount }]) => {
            labels.push(category);
            viewsByCategories.push(viewCount);
            articlesByCategories.push(articleCount);
        },
    );

    return {
        labels,
        viewsByCategories,
        articlesByCategories,
    };
};
