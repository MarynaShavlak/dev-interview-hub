import { ArticleCategoriesChartsProps } from '../../model/types/types';

export const useArticleCategoriesChartData = (
    data: ArticleCategoriesChartsProps['data'],
): {
    labels: string[];
    articlesByCategories: number[];
    viewsByCategories: number[];
} => {
    const labels: string[] = [];
    const viewsByCategories: number[] = [];
    const articlesByCategories: number[] = [];

    Object.entries(data).forEach(([category, { viewCount, articleCount }]) => {
        labels.push(category);
        viewsByCategories.push(viewCount);
        articlesByCategories.push(articleCount);
    });

    return {
        labels,
        viewsByCategories,
        articlesByCategories,
    };
};
