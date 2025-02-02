import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';

import { BarChart } from '@/shared/ui/common/Charts/ui/BarChart';
import { TopCommentedArticlesChartProps } from '../../../model/types/types';
import { useCommentsByArticlesChartData } from '../../../lib/hooks/useCommentsByArticlesChartData';

export const RedesignedTopCommentedArticlesChart = memo(
    (props: TopCommentedArticlesChartProps) => {
        const { t } = useTranslation('admin');

        const {
            articleCommentCounts,

            className,
            chartDimensions,
        } = props;
        const { labels, commentsByArticlesData } =
            useCommentsByArticlesChartData(articleCommentCounts);

        return (
            <Card className={className}>
                <BarChart
                    data={commentsByArticlesData}
                    labels={labels}
                    title={t('Рейтинг статей за кількістю коментарів')}
                    legendPosition="top"
                    xAxisTitle={t('Назва статті')}
                    yAxisTitle={t('Кількість коментарів')}
                    height={chartDimensions.height}
                    width={chartDimensions.width}
                />
            </Card>
        );
    },
);
