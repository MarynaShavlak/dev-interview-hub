import React from 'react';
import { useTranslation } from 'react-i18next';
import { StackedColumnsChart } from '@/shared/ui/common/Charts/ui/StackedColumnsChart';
import { useArticlePeriodData } from '../../../lib/hooks/useArticleQuarterlyData/useArticlePeriodData';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { VStack } from '@/shared/ui/common/Stack';
import { ArticlePeriodDataChartsProps } from '../ArticlePeriodDataCharts';

export const DeprecatedArticleQuarterlyDataCharts = (
    props: ArticlePeriodDataChartsProps,
) => {
    const { t } = useTranslation('admin');
    const { labels, categories, data } = props;

    const { chartData } = useArticlePeriodData({ categories, data });
    return (
        <VStack gap="16">
            <CardDeprecated>
                <StackedColumnsChart
                    data={chartData}
                    labels={labels}
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
            {/* <CardDeprecated> */}
            {/*    <LineChart */}
            {/*        data={accumulatedChartData} */}
            {/*        labels={periodLabels} */}
            {/*        title={t( */}
            {/*            'Динаміка зростання кількості статей за категоріями', */}
            {/*        )} */}
            {/*        legendPosition="top" */}
            {/*        xAxisTitle={t('Квартал')} */}
            {/*        yAxisTitle={t('Кількість статей')} */}
            {/*        height="300" */}
            {/*        width="750" */}
            {/*    /> */}
            {/* </CardDeprecated> */}
        </VStack>
    );
};
