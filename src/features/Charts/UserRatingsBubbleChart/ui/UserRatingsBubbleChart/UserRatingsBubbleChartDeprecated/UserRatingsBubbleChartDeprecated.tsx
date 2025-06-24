import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { BubbleChart } from '@/shared/ui/common/Charts/ui/BubbleChart';
import { Card } from '@/shared/ui/deprecated/Card';
import { useUserRatingsChartData } from '../../../lib/hooks/useUserRatingsChartData';
import { UserRatingsBubbleChartProps } from '../../../model/types/types';

export const UserRatingsBubbleChartDeprecated = memo(
    (props: UserRatingsBubbleChartProps) => {
        const { t } = useTranslation('admin');
        const { data, totalArticles, className, width, height } = props;
        const {
            ratingsByUsersData,
            maxXaxisValue,
            minXaxisValue,
            maxYaxisValue,
        } = useUserRatingsChartData(data, totalArticles);

        const xAxisTitle = t('Відсоток оцінених користувачем статей,%');
        const yAxisTitle = t('Середній рейтинг статей наданий користувачем');
        const xTooltip = t('Відсоток оцінених статей');
        const yTooltip = t('Середній рейтинг статей');
        const sizeTooltip = t('Кількість наданих відгуків');
        const title = t('Аналіз оцінок статей');
        const tooltipData = {
            x: xTooltip,
            y: yTooltip,
            z: sizeTooltip,
        };

        return (
            <Card className={className}>
                <BubbleChart
                    data={ratingsByUsersData}
                    width={width}
                    title={title}
                    legendPosition="bottom"
                    xAxisTitle={xAxisTitle}
                    yAxisTitle={yAxisTitle}
                    height={height}
                    minXaxisValue={minXaxisValue}
                    maxXaxisValue={maxXaxisValue}
                    maxYaxisValue={maxYaxisValue}
                    tooltipData={tooltipData}
                />
            </Card>
        );
    },
);
