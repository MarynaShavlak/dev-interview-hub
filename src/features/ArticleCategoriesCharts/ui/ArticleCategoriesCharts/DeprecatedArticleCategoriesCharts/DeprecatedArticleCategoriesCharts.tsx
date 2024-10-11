import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/common/Stack';
import { DonutChart } from '@/shared/ui/common/Charts/ui/DonutChart/DonutChart';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { ArticleCategoriesChartsProps } from '../../../model/types/types';
import { useArticleCategoriesChartData } from '../../../lib/hooks/useArticleCategoriesChartData';

export const DeprecatedArticleCategoriesCharts = memo(
    (props: ArticleCategoriesChartsProps) => {
        const { t } = useTranslation('admin');

        const { data } = props;
        const { labels, viewsByCategories, articlesByCategories } =
            useArticleCategoriesChartData(data);
        return (
            <HStack gap="16" max>
                <CardDeprecated>
                    <DonutChart
                        data={articlesByCategories}
                        labels={labels}
                        title={t('Cтатті за категоріями, %')}
                        legendPosition="bottom"
                    />
                </CardDeprecated>

                <CardDeprecated>
                    <DonutChart
                        data={viewsByCategories}
                        labels={labels}
                        title={t('Перегляди статей за категоріями, %')}
                        legendPosition="bottom"
                    />
                </CardDeprecated>
            </HStack>
        );
    },
);
