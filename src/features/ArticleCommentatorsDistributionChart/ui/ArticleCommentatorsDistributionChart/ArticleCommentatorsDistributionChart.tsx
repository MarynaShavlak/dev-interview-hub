import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleCommentatorsDistributionChart } from './DeprecatedArticleCommentatorsDistributionChart/DeprecatedArticleCommentatorsDistributionChart';
import { RedesignedArticleCommentatorsDistributionChart } from './RedesignedArticleCommentatorsDistributionChart/RedesignedArticleCommentatorsDistributionChart';
import { ArticleCommentatorsDistributionChartProps } from '../../model/types/types';

export const ArticleCommentatorsDistributionChart = memo(
    (props: ArticleCommentatorsDistributionChartProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <RedesignedArticleCommentatorsDistributionChart
                        {...props}
                    />
                }
                off={
                    <DeprecatedArticleCommentatorsDistributionChart
                        {...props}
                    />
                }
            />
        );
    },
);
