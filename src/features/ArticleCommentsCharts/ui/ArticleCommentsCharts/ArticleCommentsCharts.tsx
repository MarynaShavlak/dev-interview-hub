import React from 'react';
import { useArticles } from '@/entities/Article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleCommentsCharts } from './DeprecatedArticleCommentsCharts/DeprecatedArticleCommentsCharts';
import { RedesignedArticleCommentsCharts } from './RedesignedArticleCommentsCharts/RedesignedArticleCommentsCharts';
import { ArticleCommentsChartsSkeleton } from './ArticleCommentsChartsSkeleton';

export interface ArticleCommentsChartsProps {
    articleCommentsLabels: string[];
    articleCommentsData: number[];
    commentsByUsersData: { x: string; y: number }[];
}

export const ArticleCommentsCharts = (props: ArticleCommentsChartsProps) => {
    const { isLoading: isArticlesLoading, error } = useArticles(null);

    if (error) return null;

    if (isArticlesLoading) {
        return <ArticleCommentsChartsSkeleton />;
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticleCommentsCharts {...props} />}
            off={<DeprecatedArticleCommentsCharts {...props} />}
        />
    );
};
