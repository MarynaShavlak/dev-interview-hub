import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { TopCommentedArticlesChartRedesigned } from './TopCommentedArticlesChartRedesigned/TopCommentedArticlesChartRedesigned';
import { TopCommentedArticlesChartDeprecated } from './TopCommentedArticlesChartDeprecated/TopCommentedArticlesChartDeprecated';
import { TopCommentedArticlesChartProps } from '../../model/types/types';

export const TopCommentedArticlesChart = memo(
    (props: TopCommentedArticlesChartProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<TopCommentedArticlesChartRedesigned {...props} />}
                off={<TopCommentedArticlesChartDeprecated {...props} />}
            />
        );
    },
);
