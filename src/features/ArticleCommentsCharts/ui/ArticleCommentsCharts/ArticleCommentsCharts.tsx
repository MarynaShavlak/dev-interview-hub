import React from 'react';
import { useArticles } from '@/entities/Article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleCommentsCharts } from './DeprecatedArticleCommentsCharts/DeprecatedArticleCommentsCharts';
import { RedesignedArticleCommentsCharts } from './RedesignedArticleCommentsCharts/RedesignedArticleCommentsCharts';
import { ArticleCommentsChartsSkeleton } from './ArticleCommentsChartsSkeleton';

export const ArticleCommentsCharts = () => {
    const { isLoading: isArticlesLoading, error } = useArticles(null);

    if (error) return null;

    if (isArticlesLoading) {
        return <ArticleCommentsChartsSkeleton />;
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticleCommentsCharts />}
            off={<DeprecatedArticleCommentsCharts />}
        />
    );
};
