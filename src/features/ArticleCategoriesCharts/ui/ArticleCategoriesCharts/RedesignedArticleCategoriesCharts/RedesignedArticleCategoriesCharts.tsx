import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { DonutChart } from '@/shared/ui/common/Charts/ui/DonutChart/DonutChart';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleCategoriesChartsProps } from '../../../model/types/types';
import { useArticleCategoriesChartData } from '../../../lib/hooks/useArticleCategoriesChartData';
import { VStack } from '@/shared/ui/common/Stack';

export const RedesignedArticleCategoriesCharts = memo(
    (props: ArticleCategoriesChartsProps) => {
        const { t } = useTranslation('admin');

        const {
            data,
            className,
            articlesByCategoriesDimensions,
            viewsByCategoriesDimensions,
        } = props;
        const { labels, viewsByCategories, articlesByCategories } =
            useArticleCategoriesChartData(data);

        return (
            <VStack gap="16" className={className}>
                <Card>
                    <DonutChart
                        data={articlesByCategories}
                        labels={labels}
                        title={t('Cтатті за категоріями, %')}
                        legendPosition="bottom"
                        width={articlesByCategoriesDimensions.width}
                        height={articlesByCategoriesDimensions.height}
                    />
                </Card>

                <Card>
                    <DonutChart
                        data={viewsByCategories}
                        labels={labels}
                        title={t('Перегляди статей за категоріями, %')}
                        legendPosition="bottom"
                        width={viewsByCategoriesDimensions.width}
                        height={viewsByCategoriesDimensions.height}
                    />
                </Card>
            </VStack>
        );
    },
);
