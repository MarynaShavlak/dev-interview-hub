import React from 'react';
import { useTranslation } from 'react-i18next';
import { useArticles } from '@/entities/Article';
import { StackedColumnsChart } from '@/shared/ui/common/Charts/ui/StackedColumnsChart';
import { LineChart } from '@/shared/ui/common/Charts/ui/LineChart';
import { useArticleQuarterlyData } from '../../../lib/hooks/useArticleQuarterlyData/useArticleQuarterlyData';
import { VStack } from '@/shared/ui/common/Stack';
import { Card } from '@/shared/ui/redesigned/Card';

export const RedesignedArticleQuarterlyDataCharts = () => {
    const { t } = useTranslation('admin');
    const { data: articles, isLoading: isArticlesLoading } = useArticles(null);

    const { periodLabels, chartData } = useArticleQuarterlyData({});
    const { chartData: accumulatedChartData } = useArticleQuarterlyData({
        isAccumulated: true,
    });

    return (
        <VStack gap="16">
            <Card>
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
                    width="800"
                />
            </Card>
            <Card>
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
                    width="800"
                />
            </Card>
        </VStack>
    );
};
