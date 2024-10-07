import React from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/common/Stack';
import { DonutChart } from '@/shared/ui/common/Charts/ui/DonutChart/DonutChart';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleCategoriesChartsProps } from '../ArticleCategoriesCharts';

export const RedesignedArticleCategoriesCharts = (
    props: ArticleCategoriesChartsProps,
) => {
    const { t } = useTranslation('admin');
    // const {
    //     labels: categoryLabels,
    //     articleData: articlesQuantityByCategoriesData,
    //     viewData: articleViewsByCategoriesData,
    // } = useArticleCategoryData();
    const {
        labels: categoryLabels,
        articleData: articlesQuantityByCategoriesData,
        viewData: articleViewsByCategoriesData,
    } = props;

    return (
        <HStack gap="24" max>
            <Card>
                <DonutChart
                    data={articlesQuantityByCategoriesData}
                    labels={categoryLabels}
                    title={t('Cтатті за категоріями, %')}
                    legendPosition="bottom"
                />
            </Card>

            <Card>
                <DonutChart
                    data={articleViewsByCategoriesData}
                    labels={categoryLabels}
                    title={t('Перегляди статей за категоріями, %')}
                    legendPosition="bottom"
                />
            </Card>
        </HStack>
    );
};
