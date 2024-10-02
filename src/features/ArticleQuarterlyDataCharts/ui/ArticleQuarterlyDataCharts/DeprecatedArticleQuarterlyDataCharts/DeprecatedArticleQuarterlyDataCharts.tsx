import React from 'react';
import { useTranslation } from 'react-i18next';
import { StackedColumnsChart } from '@/shared/ui/common/Charts/ui/StackedColumnsChart';
import { LineChart } from '@/shared/ui/common/Charts/ui/LineChart';
import { useArticleQuarterlyData } from '../../../lib/hooks/useArticleQuarterlyData/useArticleQuarterlyData';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { VStack } from '@/shared/ui/common/Stack';

export const DeprecatedArticleQuarterlyDataCharts = () => {
    const { t } = useTranslation('admin');

    const { periodLabels, chartData } = useArticleQuarterlyData({});
    const { chartData: accumulatedChartData } = useArticleQuarterlyData({
        isAccumulated: true,
    });

    return (
        <VStack gap="16">
            <CardDeprecated>
                <StackedColumnsChart
                    data={chartData}
                    labels={periodLabels}
                    title={t(
                        'Розподіл кількості опублікованих статей за категоріями по кварталах',
                    )}
                    legendPosition="top"
                    xAxisTitle={t('Квартал')}
                    yAxisTitle={t('Кількість статей')}
                    height="300"
                    width="750"
                />
            </CardDeprecated>
            <CardDeprecated>
                <LineChart
                    data={accumulatedChartData}
                    labels={periodLabels}
                    title={t(
                        'Динаміка зростання кількості статей за категоріями',
                    )}
                    legendPosition="top"
                    xAxisTitle={t('Квартал')}
                    yAxisTitle={t('Кількість статей')}
                    height="300"
                    width="750"
                />
            </CardDeprecated>
        </VStack>
    );
};
