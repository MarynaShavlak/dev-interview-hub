import React from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/common/Stack';
import { DonutChart } from '@/shared/ui/common/Charts/ui/DonutChart/DonutChart';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleCategoriesChartsProps } from '../../../model/types/types';
import { useArticleCategoriesChartData } from '../../../lib/hooks/useArticleCategoriesChartData';

export const RedesignedArticleCategoriesCharts = (
    props: ArticleCategoriesChartsProps,
) => {
    const { t } = useTranslation('admin');

    const { data } = props;
    const { labels, viewsByCategories, articlesByCategories } =
        useArticleCategoriesChartData(data);

    return (
        <HStack gap="24" max>
            <Card>
                <DonutChart
                    data={articlesByCategories}
                    labels={labels}
                    title={t('Cтатті за категоріями, %')}
                    legendPosition="bottom"
                />
            </Card>

            <Card>
                <DonutChart
                    data={viewsByCategories}
                    labels={labels}
                    title={t('Перегляди статей за категоріями, %')}
                    legendPosition="bottom"
                />
            </Card>
        </HStack>
    );
};
