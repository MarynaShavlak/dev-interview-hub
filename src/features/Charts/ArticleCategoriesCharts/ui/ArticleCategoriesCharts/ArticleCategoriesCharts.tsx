import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleCategoriesChartsDeprecated } from './ArticleCategoriesChartsDeprecated/ArticleCategoriesChartsDeprecated';
import { ArticleCategoriesChartsRedesigned } from './ArticleCategoriesChartsRedesigned/ArticleCategoriesChartsRedesigned';
import { ArticleCategoriesChartsProps } from '../../model/types/types';

export const ArticleCategoriesCharts = memo(
    (props: ArticleCategoriesChartsProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<ArticleCategoriesChartsRedesigned {...props} />}
                off={<ArticleCategoriesChartsDeprecated {...props} />}
            />
        );
    },
);
