import { useTranslation } from 'react-i18next';
import React from 'react';
import { BubbleChart } from '@/shared/ui/common/Charts/ui/BubbleChart';
import { Card } from '@/shared/ui/deprecated/Card';
import { useUserRatingsChartData } from '../../../lib/hooks/useArticleRatingsCharts';
import { UserRatingsBubbleChartProps } from '../../../model/types/types';

export const DeprecatedUserRatingsBubbleChart = (
    props: UserRatingsBubbleChartProps,
) => {
    const { t } = useTranslation('admin');
    const { data, totalArticles } = props;
    const { ratingsByUsersData, maxXaxisValue } = useUserRatingsChartData(
        data,
        totalArticles,
    );

    const xAxisTitle = t('Відсоток оцінених користувачем статей,%');
    const yAxisTitle = t('Середній рейтинг статей наданий користувачем');
    const xTooltip = t('Відсоток оцінених статей');
    const yTooltip = t('Середній рейтинг статей');
    const sizeTooltip = t('Кількість наданих відгуків');
    const tooltipData = {
        x: xTooltip,
        y: yTooltip,
        z: sizeTooltip,
    };

    return (
        <Card>
            <BubbleChart
                data={ratingsByUsersData}
                width="800"
                title={`${xAxisTitle} & ${yAxisTitle}`}
                legendPosition="bottom"
                xAxisTitle={xAxisTitle}
                yAxisTitle={yAxisTitle}
                height="400"
                minXaxisValue={0}
                maxXaxisValue={maxXaxisValue}
                maxYaxisValue={5}
                tooltipData={tooltipData}
            />
        </Card>
    );
};
