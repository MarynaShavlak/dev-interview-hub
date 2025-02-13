import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleCommentatorsDistributionChartDeprecated } from './ArticleCommentatorsDistributionChartDeprecated/ArticleCommentatorsDistributionChartDeprecated';
import { ArticleCommentatorsDistributionChartRedesigned } from './ArticleCommentatorsDistributionChartRedesigned/ArticleCommentatorsDistributionChartRedesigned';
import { ArticleCommentatorsDistributionChartProps } from '../../model/types/types';

export const ArticleCommentatorsDistributionChart = memo(
    (props: ArticleCommentatorsDistributionChartProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <ArticleCommentatorsDistributionChartRedesigned
                        {...props}
                    />
                }
                off={
                    <ArticleCommentatorsDistributionChartDeprecated
                        {...props}
                    />
                }
            />
        );
    },
);
