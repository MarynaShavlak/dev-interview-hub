import React, { memo } from 'react';
import { useGetArticles } from '@/entities/Article';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleQuarterlyDataChartDeprecated } from './ArticleQuarterlyDataChartDeprecated/ArticleQuarterlyDataChartDeprecated';
import { ArticleQuarterlyDataChartRedesigned } from './ArticleQuarterlyDataChartRedesigned/ArticleQuarterlyDataChartRedesigned';

import { ArticleQuarterlyDataChartProps } from '../../model/types/types';

export const ArticleQuarterlyDataChart = memo(
    (props: ArticleQuarterlyDataChartProps) => {
        const { isLoading: isArticlesLoading, error } = useGetArticles();

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<ArticleQuarterlyDataChartRedesigned {...props} />}
                off={<ArticleQuarterlyDataChartDeprecated {...props} />}
            />
        );
    },
);
