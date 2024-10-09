import React from 'react';
import { useArticles } from '@/entities/Article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { RedesignedArticleRatingDistributionChart } from './RedesignedArticleRatingDistributionChart/RedesignedArticleRatingDistributionChart';
import { DeprecatedArticleRatingDistributionChart } from './DeprecatedArticleRatingDistributionChart/DeprecatedArticleRatingDistributionChart';
import { ArticleRatingDistributionChartSkeleton } from './ArticleRatingDistributionChartSkeleton';

export interface ArticleRatingDistributionChartProps {
    data: [number, number, number];
    totalValue: string;
}

export const ArticleRatingDistributionChart = (
    props: ArticleRatingDistributionChartProps,
) => {
    const { isLoading: isArticlesLoading, error } = useArticles(null);

    if (error) return null;

    if (isArticlesLoading) {
        return <ArticleRatingDistributionChartSkeleton />;
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticleRatingDistributionChart {...props} />}
            off={<DeprecatedArticleRatingDistributionChart {...props} />}
        />
    );
};
