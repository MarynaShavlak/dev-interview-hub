import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useArticleMonthlyData } from '../../../lib/hooks/useArticleMonthlyData';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { LineChart } from '@/shared/ui/common/Charts/ui/LineChart';
import { ArticleMonthlyDataChartProps } from '../../../model/types/types';

export const DeprecatedArticleMonthlyDataChart = memo(
    (props: ArticleMonthlyDataChartProps) => {
        const { t } = useTranslation('admin');
        const { categories, data, className, chartDimensions } = props;

        const { monthlyLabels, monthlyCategoryData } = useArticleMonthlyData(
            categories,
            data,
        );

        return (
            <CardDeprecated className={className}>
                <LineChart
                    data={monthlyCategoryData}
                    labels={monthlyLabels}
                    title={t(
                        'Динаміка зростання кількості статей за категоріями',
                    )}
                    legendPosition="top"
                    xAxisTitle={t('Місяць')}
                    yAxisTitle={t('Кількість статей')}
                    height={chartDimensions.height}
                    width={chartDimensions.width}
                />
            </CardDeprecated>
        );
    },
);
