import React, { memo } from 'react';
import { useGetArticles } from '@/entities/Article';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleMonthlyDataChartDeprecated } from './ArticleMonthlyDataChartDeprecated/ArticleMonthlyDataChartDeprecated';
import { ArticleMonthlyDataChartRedesigned } from './ArticleMonthlyDataChartRedesigned/ArticleMonthlyDataChartRedesigned';

import { ArticleMonthlyDataChartSkeleton } from './ArticleMonthlyDataChartSkeleton';
import { ArticleMonthlyDataChartProps } from '../../model/types/types';

export const ArticleMonthlyDataChart = memo(
    (props: ArticleMonthlyDataChartProps) => {
        const { isLoading: isArticlesLoading, error } = useGetArticles();
        if (error) return null;

        if (isArticlesLoading) {
            return <ArticleMonthlyDataChartSkeleton />;
        }

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<ArticleMonthlyDataChartRedesigned {...props} />}
                off={<ArticleMonthlyDataChartDeprecated {...props} />}
            />
        );
    },
);
