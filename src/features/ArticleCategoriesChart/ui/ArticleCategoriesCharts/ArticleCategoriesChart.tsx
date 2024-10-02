import React from 'react';
import { useArticles } from '@/entities/Article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleCategoriesCharts } from './DeprecatedArticleCategoriesCharts/DeprecatedArticleCategoriesCharts';
import { RedesignedArticleCategoriesCharts } from './RedesignedArticleCategoriesCharts/RedesignedArticleCategoriesCharts';
import { ArticleCategoriesChartSkeleton } from '../ArticleCategoriesChartSkeleton/ArticleCategoriesChartSkeleton';

export const ArticleCategoriesCharts = () => {
    const { isLoading: isArticlesLoading, error } = useArticles(null);

    if (error) return null;

    if (isArticlesLoading) {
        return <ArticleCategoriesChartSkeleton />;
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticleCategoriesCharts />}
            off={<DeprecatedArticleCategoriesCharts />}
        />
    );
};
