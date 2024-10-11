import React from 'react';
import { useTranslation } from 'react-i18next';
import { StackedColumnsChart } from '@/shared/ui/common/Charts/ui/StackedColumnsChart';
import { useArticlePeriodData } from '../../../lib/hooks/useArticlePeriodData';
import { VStack } from '@/shared/ui/common/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { LineChart } from '@/shared/ui/common/Charts/ui/LineChart';
import { ArticlePeriodDataChartsProps } from '../../../model/types/types';

export const RedesignedArticlePeriodDataCharts = (
    props: ArticlePeriodDataChartsProps,
) => {
    const { t } = useTranslation('admin');
    const { categories, data } = props;

    const {
        quarterlyCategoryData,
        quarterlyLabels,
        monthlyLabels,
        monthlyCategoryData,
    } = useArticlePeriodData(categories, data);

    return (
        <VStack gap="16">
            <Card>
                <StackedColumnsChart
                    data={quarterlyCategoryData}
                    labels={quarterlyLabels}
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
                    data={monthlyCategoryData}
                    labels={monthlyLabels}
                    title={t(
                        'Динаміка зростання кількості статей за категоріями',
                    )}
                    legendPosition="top"
                    xAxisTitle={t('Місяць')}
                    yAxisTitle={t('Кількість статей')}
                    height="300"
                    width="800"
                />
            </Card>
        </VStack>
    );
};
