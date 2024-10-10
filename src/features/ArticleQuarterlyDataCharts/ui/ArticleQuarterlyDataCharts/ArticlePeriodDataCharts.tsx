import React from 'react';
import { useTranslation } from 'react-i18next';
import { useArticles } from '@/entities/Article';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleQuarterlyDataCharts } from './DeprecatedArticleQuarterlyDataCharts/DeprecatedArticleQuarterlyDataCharts';
import { RedesignedArticleQuarterlyDataCharts } from './RedesignedArticleQuarterlyDataCharts/RedesignedArticleQuarterlyDataCharts';

import { ArticleQuarterlyDataChartSkeleton } from './ArticleQuarterlyDataChartSkeleton';

export interface ArticlePeriodDataChartsProps {
    categories: string[];
    labels: string[];
    data: Record<string, { [key: string]: number }>;
}

export const ArticlePeriodDataCharts = (
    props: ArticlePeriodDataChartsProps,
) => {
    const { t } = useTranslation('admin');

    const { isLoading: isArticlesLoading, error } = useArticles(null);

    if (error) return null;

    if (isArticlesLoading) {
        return <ArticleQuarterlyDataChartSkeleton />;
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticleQuarterlyDataCharts {...props} />}
            off={<DeprecatedArticleQuarterlyDataCharts {...props} />}
        />
    );
};
