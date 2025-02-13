import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StackedColumnsChart } from '@/shared/ui/common/Charts/ui/StackedColumnsChart';
import { useArticleQuarterlyData } from '../../../lib/hooks/useArticleQuarterlyData';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { ArticleQuarterlyDataChartProps } from '../../../model/types/types';

export const ArticleQuarterlyDataChartDeprecated = memo(
    (props: ArticleQuarterlyDataChartProps) => {
        const { t } = useTranslation('admin');
        const { categories, data, className, chartDimensions } = props;

        const { quarterlyCategoryData, quarterlyLabels } =
            useArticleQuarterlyData(categories, data);

        return (
            <CardDeprecated className={className}>
                <StackedColumnsChart
                    data={quarterlyCategoryData}
                    labels={quarterlyLabels}
                    title={t(
                        'Розподіл кількості опублікованих статей за категоріями по кварталах',
                    )}
                    legendPosition="top"
                    xAxisTitle={t('Квартал')}
                    yAxisTitle={t('Кількість статей')}
                    height={chartDimensions.height}
                    width={chartDimensions.width}
                />
            </CardDeprecated>
        );
    },
);
