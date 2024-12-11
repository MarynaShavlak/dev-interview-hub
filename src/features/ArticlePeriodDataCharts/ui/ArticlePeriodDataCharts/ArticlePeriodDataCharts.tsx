import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useArticles } from '@/entities/Article';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticlePeriodDataCharts } from './DeprecatedArticlePeriodDataCharts/DeprecatedArticlePeriodDataCharts';
import { RedesignedArticlePeriodDataCharts } from './RedesignedArticlePeriodDataCharts/RedesignedArticlePeriodDataCharts';

import { ArticlePeriodDataChartSkeleton } from './ArticlePeriodDataChartSkeleton';
import { ArticlePeriodDataChartsProps } from '../../model/types/types';

export const ArticlePeriodDataCharts = memo(
    (props: ArticlePeriodDataChartsProps) => {
        const { t } = useTranslation('admin');

        const { isLoading: isArticlesLoading, error } = useArticles();

        if (error) return null;

        if (isArticlesLoading) {
            return <ArticlePeriodDataChartSkeleton />;
        }

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedArticlePeriodDataCharts {...props} />}
                off={<DeprecatedArticlePeriodDataCharts {...props} />}
            />
        );
    },
);
