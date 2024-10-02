import React from 'react';
import { useArticles } from '@/entities/Article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleCategoriesChart } from './DeprecatedArticleCategoriesChart/DeprecatedArticleCategoriesChart';
import { RedesignedArticleCategoriesChart } from './RedesignedArticleCategoriesChart/RedesignedArticleCategoriesChart';
import { ArticleCategoriesChartSkeleton } from '../ArticleCategoriesChartSkeleton/ArticleCategoriesChartSkeleton';

export const ArticleCategoriesChart = () => {
    const { isLoading: isArticlesLoading, error } = useArticles(null);

    if (error) return null;

    if (isArticlesLoading) {
        return <ArticleCategoriesChartSkeleton />;
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticleCategoriesChart />}
            off={<DeprecatedArticleCategoriesChart />}
        />
    );
};
