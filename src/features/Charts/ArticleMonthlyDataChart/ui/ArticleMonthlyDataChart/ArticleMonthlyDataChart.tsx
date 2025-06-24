import React, { memo } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleMonthlyDataChartDeprecated } from './ArticleMonthlyDataChartDeprecated/ArticleMonthlyDataChartDeprecated';
import { ArticleMonthlyDataChartRedesigned } from './ArticleMonthlyDataChartRedesigned/ArticleMonthlyDataChartRedesigned';

import { ArticleMonthlyDataChartProps } from '../../model/types/types';

export const ArticleMonthlyDataChart = memo(
    (props: ArticleMonthlyDataChartProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<ArticleMonthlyDataChartRedesigned {...props} />}
                off={<ArticleMonthlyDataChartDeprecated {...props} />}
            />
        );
    },
);
