import { useTranslation } from 'react-i18next';
import React from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { RadialbarChart } from '@/shared/ui/common/Charts/ui/RadialbarChart';
import { ArticleRatingDistributionChartProps } from '../ArticleRatingDistributionChart';

export const RedesignedArticleRatingDistributionChart = (
    props: ArticleRatingDistributionChartProps,
) => {
    const { t } = useTranslation('admin');
    const { data, totalValue } = props;

    const labels = [
        `${t('Оцінка 1-2')}`,
        `${t('Оцінка 3-4')}`,
        `${t('Оцінка 5')}`,
    ];

    return (
        <Card>
            <RadialbarChart
                data={data}
                labels={labels}
                title={t('Розподіл статей за оцінками')}
                legendPosition="top"
                height="200"
                width="220"
                totalLabel={t('Загальна кількість')}
                totalValue={totalValue}
            />
        </Card>
    );
};
