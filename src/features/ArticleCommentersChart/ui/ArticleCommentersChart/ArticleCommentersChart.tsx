import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleCommentersChartDeprecated } from './ArticleCommentersChartDeprecated/ArticleCommentersChartDeprecated';
import { ArticleCommentersChartRedesigned } from './ArticleCommentersChartRedesigned/ArticleCommentersChartRedesigned';
import { ArticleCommentersChartProps } from '../../model/types/types';

export const ArticleCommentersChart = memo(
    (props: ArticleCommentersChartProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<ArticleCommentersChartRedesigned {...props} />}
                off={<ArticleCommentersChartDeprecated {...props} />}
            />
        );
    },
);
