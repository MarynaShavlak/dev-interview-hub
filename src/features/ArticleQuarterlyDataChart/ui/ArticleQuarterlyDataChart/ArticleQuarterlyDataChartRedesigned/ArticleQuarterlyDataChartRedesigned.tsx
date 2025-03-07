import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StackedColumnsChart } from '@/shared/ui/common/Charts/ui/StackedColumnsChart';
import { useArticleQuarterlyData } from '../../../lib/hooks/useArticleQuarterlyData';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleQuarterlyDataChartProps } from '../../../model/types/types';

export const ArticleQuarterlyDataChartRedesigned = memo(
    (props: ArticleQuarterlyDataChartProps) => {
        const { t } = useTranslation('admin');
        const { categories, data, className, chartDimensions } = props;
        console.log(data, categories);

        const { quarterlyCategoryData, quarterlyLabels } =
            useArticleQuarterlyData(categories, data);
        console.log('quarterlyCategoryData', quarterlyCategoryData);

        return (
            <Card className={className}>
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
            </Card>
        );
    },
);
