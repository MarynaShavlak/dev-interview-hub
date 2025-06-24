import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleRatingDistributionChartRedesigned } from './ArticleRatingDistributionChartRedesigned/ArticleRatingDistributionChartRedesigned';
import { ArticleRatingDistributionChartDeprecated } from './ArticleRatingDistributionChartDeprecated/ArticleRatingDistributionChartDeprecated';
import { ArticleRatingDistributionChartProps } from '../../model/types/types';

export const ArticleRatingDistributionChart = memo(
    (props: ArticleRatingDistributionChartProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<ArticleRatingDistributionChartRedesigned {...props} />}
                off={<ArticleRatingDistributionChartDeprecated {...props} />}
            />
        );
    },
);
