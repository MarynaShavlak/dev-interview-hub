import { useTranslation } from 'react-i18next';
import React from 'react';
import { BubbleChart } from '@/shared/ui/common/Charts/ui/BubbleChart';
import { Card } from '@/shared/ui/redesigned/Card';
import { useArticleRatingsChartsData } from '../../lib/hooks/useArticleRatingsChartsData';

export const ArticleRatingsDataCharts = () => {
    const { t } = useTranslation('admin');
    const { articleRatingsByUsersData } = useArticleRatingsChartsData();

    return (
        <Card>
            <BubbleChart
                data={articleRatingsByUsersData}
                width="800"
                title={t(
                    'Середній рейтинг статей наданий користувачем  & Відсоток оцінених користувачем статей',
                )}
                legendPosition="bottom"
                xAxisTitle={t('ID статті')}
                yAxisTitle={t('Кількість коментарів')}
                height="300"
            />
        </Card>
    );
};
