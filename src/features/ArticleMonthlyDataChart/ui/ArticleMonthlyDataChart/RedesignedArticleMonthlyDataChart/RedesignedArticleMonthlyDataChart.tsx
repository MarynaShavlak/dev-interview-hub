import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useArticleMonthlyData } from '../../../lib/hooks/useArticleMonthlyData';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleMonthlyDataChartProps } from '../../../model/types/types';
import { LineChart } from '@/shared/ui/common/Charts/ui/LineChart';

export const RedesignedArticleMonthlyDataChart = memo(
    (props: ArticleMonthlyDataChartProps) => {
        const { t } = useTranslation('admin');
        const { categories, data, className, chartDimensions } = props;

        const { monthlyLabels, monthlyCategoryData } = useArticleMonthlyData(
            categories,
            data,
        );

        return (
            <Card className={className}>
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
            </Card>
        );
    },
);
