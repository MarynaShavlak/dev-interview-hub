import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetArticles } from '@/entities/Article';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleMonthlyDataChart } from './DeprecatedArticleMonthlyDataChart/DeprecatedArticleMonthlyDataChart';
import { RedesignedArticleMonthlyDataChart } from './RedesignedArticleMonthlyDataChart/RedesignedArticleMonthlyDataChart';

import { ArticleMonthlyDataChartSkeleton } from './ArticleMonthlyDataChartSkeleton';
import { ArticleMonthlyDataChartProps } from '../../model/types/types';

export const ArticleMonthlyDataChart = memo(
    (props: ArticleMonthlyDataChartProps) => {
        const { t } = useTranslation('admin');

        const { isLoading: isArticlesLoading, error } = useGetArticles();

        if (error) return null;

        if (isArticlesLoading) {
            return <ArticleMonthlyDataChartSkeleton />;
        }

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedArticleMonthlyDataChart {...props} />}
                off={<DeprecatedArticleMonthlyDataChart {...props} />}
            />
        );
    },
);
