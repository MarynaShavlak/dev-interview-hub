import React from 'react';
import { useArticles } from '@/entities/Article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleRatingsChartsSkeleton } from './ArticleRatingsChartsSkeleton';
import { DeprecatedArticleRatingsCharts } from './DeprecatedArticleRatingsCharts/DeprecatedArticleRatingsCharts';
import { RedesignedArticleRatingsCharts } from './RedesignedArticleRatingsCharts/RedesignedArticleRatingsCharts';

export interface ArticleRatingsChartsProps {
    ratingsByUsersData: { name: string; data: number[][] }[];
    maxXaxisValue: number;
}

export const ArticleRatingsCharts = (props: ArticleRatingsChartsProps) => {
    const { isLoading: isArticlesLoading, error } = useArticles(null);

    if (error) return null;

    if (isArticlesLoading) {
        return <ArticleRatingsChartsSkeleton />;
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticleRatingsCharts {...props} />}
            off={<DeprecatedArticleRatingsCharts {...props} />}
        />
    );
};
