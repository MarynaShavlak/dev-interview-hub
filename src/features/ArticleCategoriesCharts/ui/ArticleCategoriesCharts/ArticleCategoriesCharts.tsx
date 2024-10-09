import React from 'react';
import { useArticles } from '@/entities/Article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleCategoriesCharts } from './DeprecatedArticleCategoriesCharts/DeprecatedArticleCategoriesCharts';
import { RedesignedArticleCategoriesCharts } from './RedesignedArticleCategoriesCharts/RedesignedArticleCategoriesCharts';
import { ArticleCategoriesChartsSkeleton } from '../ArticleCategoriesChartsSkeleton/ArticleCategoriesChartsSkeleton';

export interface ArticleCategoriesChartsProps {
    labels: string[];
    articlesByCategories: number[];
    viewsByCategories: number[];
}

export const ArticleCategoriesCharts = (
    props: ArticleCategoriesChartsProps,
) => {
    const { isLoading: isArticlesLoading, error } = useArticles(null);

    if (error) return null;

    if (isArticlesLoading) {
        return <ArticleCategoriesChartsSkeleton />;
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticleCategoriesCharts {...props} />}
            off={<DeprecatedArticleCategoriesCharts {...props} />}
        />
    );
};
