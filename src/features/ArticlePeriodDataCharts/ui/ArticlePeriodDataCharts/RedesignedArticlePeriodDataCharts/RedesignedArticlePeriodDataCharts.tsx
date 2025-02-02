import React from 'react';
import { useTranslation } from 'react-i18next';
import { StackedColumnsChart } from '@/shared/ui/common/Charts/ui/StackedColumnsChart';
import { useArticlePeriodData } from '../../../lib/hooks/useArticlePeriodData';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticlePeriodDataChartsProps } from '../../../model/types/types';
import { LineChart } from '@/shared/ui/common/Charts/ui/LineChart';

export const RedesignedArticlePeriodDataCharts = (
    props: ArticlePeriodDataChartsProps,
) => {
    const { t } = useTranslation('admin');
    const {
        categories,
        data,
        className,
        isQuarterlyChart,
        isMonthlyChart,
        quarterlyCategoryDimensions,
        monthlyCategoryDimensions,
    } = props;

    const {
        quarterlyCategoryData,
        quarterlyLabels,
        monthlyLabels,
        monthlyCategoryData,
    } = useArticlePeriodData(categories, data);

    return (
        <>
            {isQuarterlyChart && (
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
                        height={quarterlyCategoryDimensions.height}
                        width={quarterlyCategoryDimensions.width}
                    />
                </Card>
            )}

            {isMonthlyChart && (
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
                        height={monthlyCategoryDimensions.height}
                        width={monthlyCategoryDimensions.width}
                    />
                </Card>
            )}
        </>
    );
};
