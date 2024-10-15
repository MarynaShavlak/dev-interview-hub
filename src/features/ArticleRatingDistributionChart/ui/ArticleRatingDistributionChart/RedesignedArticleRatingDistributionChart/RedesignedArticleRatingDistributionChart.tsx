import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { RadialbarChart } from '@/shared/ui/common/Charts/ui/RadialbarChart';
import { ArticleRatingDistributionChartProps } from '../../../model/types/types';
import { useRatingsDistributionChartData } from '../../../lib/hooks/useRatingsDistributionChartData';

export const RedesignedArticleRatingDistributionChart = memo(
    (props: ArticleRatingDistributionChartProps) => {
        const { t } = useTranslation('admin');
        const { ratingDistributionMap, totalArticlesWithRatings, className } =
            props;

        const articlesByRatingDistributionData =
            useRatingsDistributionChartData(
                ratingDistributionMap,
                totalArticlesWithRatings,
            );

        const labels = [
            `${t('Оцінка 1-2')}`,
            `${t('Оцінка 3-4')}`,
            `${t('Оцінка 5')}`,
        ];

        return (
            <Card className={className}>
                <RadialbarChart
                    data={articlesByRatingDistributionData}
                    labels={labels}
                    title={t('Розподіл статей за оцінками')}
                    legendPosition="top"
                    height="200"
                    width="220"
                    totalLabel={t('Загальна кількість')}
                    totalValue={`${totalArticlesWithRatings}`}
                />
            </Card>
        );
    },
);
