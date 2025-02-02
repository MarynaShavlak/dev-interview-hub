import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetArticles } from '@/entities/Article';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleQuarterlyDataChart } from './DeprecatedArticleQuarterlyDataChart/DeprecatedArticleQuarterlyDataChart';
import { RedesignedArticleQuarterlyDataChart } from './RedesignedArticleQuarterlyDataChart/RedesignedArticleQuarterlyDataChart';

import { ArticleQuarterlyDataChartSkeleton } from './ArticleQuarterlyDataChartSkeleton';
import { ArticleQuarterlyDataChartProps } from '../../model/types/types';

export const ArticleQuarterlyDataChart = memo(
    (props: ArticleQuarterlyDataChartProps) => {
        const { t } = useTranslation('admin');

        const { isLoading: isArticlesLoading, error } = useGetArticles();

        if (error) return null;

        if (isArticlesLoading) {
            return <ArticleQuarterlyDataChartSkeleton />;
        }

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedArticleQuarterlyDataChart {...props} />}
                off={<DeprecatedArticleQuarterlyDataChart {...props} />}
            />
        );
    },
);
