import React from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/common/Stack';
import { DonutChart } from '@/shared/ui/common/Charts/ui/DonutChart/DonutChart';
import { useArticleCategoryData } from '../../../lib/hooks/useArticleCategoryData/useArticleCategoryData';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';

export const DeprecatedArticleCategoriesCharts = () => {
    const { t } = useTranslation('admin');

    const {
        labels: categoryLabels,
        articleData: articlesQuantityByCategoriesData,
        viewData: articleViewsByCategoriesData,
    } = useArticleCategoryData();

    return (
        <HStack gap="24" max>
            <CardDeprecated>
                <DonutChart
                    data={articlesQuantityByCategoriesData}
                    labels={categoryLabels}
                    title={t('Cтатті за категоріями, %')}
                    legendPosition="bottom"
                />
            </CardDeprecated>

            <CardDeprecated>
                <DonutChart
                    data={articleViewsByCategoriesData}
                    labels={categoryLabels}
                    title={t('Перегляди статей за категоріями, %')}
                    legendPosition="bottom"
                />
            </CardDeprecated>
        </HStack>
    );
};
