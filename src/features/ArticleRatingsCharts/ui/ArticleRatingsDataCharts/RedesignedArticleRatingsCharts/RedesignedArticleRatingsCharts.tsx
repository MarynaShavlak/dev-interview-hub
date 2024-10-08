import { useTranslation } from 'react-i18next';
import React from 'react';
import { BubbleChart } from '@/shared/ui/common/Charts/ui/BubbleChart';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleRatingsChartsProps } from '../ArticleRatingsCharts';

export const RedesignedArticleRatingsCharts = (
    props: ArticleRatingsChartsProps,
) => {
    const { t } = useTranslation('admin');
    const { articleRatingsByUsersData, maxXaxisValue } = props;

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
                data={articleRatingsByUsersData}
                width="800"
                title={`${xAxisTitle} & ${yAxisTitle}`}
                legendPosition="bottom"
                xAxisTitle={xAxisTitle}
                yAxisTitle={yAxisTitle}
                height="400"
                minXaxisValue={0}
                maxXaxisValue={maxXaxisValue}
                maxYaxisValue={6}
                tooltipData={tooltipData}
            />
        </Card>
    );
};
