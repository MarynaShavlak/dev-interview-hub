import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { RedesignedArticleRatingDistributionChart } from './RedesignedArticleRatingDistributionChart/RedesignedArticleRatingDistributionChart';
import { DeprecatedArticleRatingDistributionChart } from './DeprecatedArticleRatingDistributionChart/DeprecatedArticleRatingDistributionChart';
import { ArticleRatingDistributionChartProps } from '../../model/types/types';

export const ArticleRatingDistributionChart = memo(
    (props: ArticleRatingDistributionChartProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedArticleRatingDistributionChart {...props} />}
                off={<DeprecatedArticleRatingDistributionChart {...props} />}
            />
        );
    },
);
