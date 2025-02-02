import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { RedesignedTopCommentedArticlesChart } from './RedesignedTopCommentedArticlesChart/RedesignedTopCommentedArticlesChart';
import { DeprecatedTopCommentedArticlesChart } from './DeprecatedTopCommentedArticlesChart/DeprecatedTopCommentedArticlesChart';
import { TopCommentedArticlesChartProps } from '../../model/types/types';

export const TopCommentedArticlesChart = memo(
    (props: TopCommentedArticlesChartProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedTopCommentedArticlesChart {...props} />}
                off={<DeprecatedTopCommentedArticlesChart {...props} />}
            />
        );
    },
);
