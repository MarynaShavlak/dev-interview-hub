import React from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleCommentsCharts } from './DeprecatedArticleCommentsCharts/DeprecatedArticleCommentsCharts';
import { RedesignedArticleCommentsCharts } from './RedesignedArticleCommentsCharts/RedesignedArticleCommentsCharts';
import { ArticleCommentsChartsProps } from '../../model/types/types';

export const ArticleCommentsCharts = (props: ArticleCommentsChartsProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticleCommentsCharts {...props} />}
            off={<DeprecatedArticleCommentsCharts {...props} />}
        />
    );
};
