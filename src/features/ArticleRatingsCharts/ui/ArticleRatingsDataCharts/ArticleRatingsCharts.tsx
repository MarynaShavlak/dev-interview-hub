import React from 'react';
import { useArticles } from '@/entities/Article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleRatingsChartsSkeleton } from './ArticleRatingsChartsSkeleton';
import { DeprecatedArticleRatingsCharts } from './DeprecatedArticleRatingsCharts/DeprecatedArticleRatingsCharts';
import { RedesignedArticleRatingsCharts } from './RedesignedArticleRatingsCharts/RedesignedArticleRatingsCharts';

interface ArticleRatingsChartsProps {
    articleRatingsByUsersData={ratingsChartData}
maxXaxisValue={maxXaxisValue}
}

export const ArticleRatingsCharts = () => {
    const { isLoading: isArticlesLoading, error } = useArticles(null);

    if (error) return null;

    if (isArticlesLoading) {
        return <ArticleRatingsChartsSkeleton />;
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticleRatingsCharts />}
            off={<DeprecatedArticleRatingsCharts />}
        />
    );
};
