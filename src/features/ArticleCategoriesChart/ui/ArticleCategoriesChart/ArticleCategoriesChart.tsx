import React from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/common/Stack';
import { DonutChart } from '@/shared/ui/common/Charts/ui/DonutChart/DonutChart';
import { useArticles } from '@/entities/Article';
import { useArticleCategoryData } from '../../lib/hook/useArticleCategoryData/useArticleCategoryData';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export const ArticleCategoriesChart = () => {
    const { t } = useTranslation('admin');
    const { isLoading: isArticlesLoading } = useArticles(null);

    const {
        labels: categoryLabels,
        articleData: articlesQuantityByCategoriesData,
        viewData: articleViewsByCategoriesData,
    } = useArticleCategoryData();

    if (isArticlesLoading) {
        return (
            <HStack gap="24" justify="center" max>
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Skeleton width={400} height={400} />}
                    off={<SkeletonDeprecated width={400} height={400} />}
                />
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Skeleton width={400} height={400} />}
                    off={<SkeletonDeprecated width={400} height={400} />}
                />
            </HStack>
        );
    }

    return (
        <HStack gap="24" justify="center" max>
            <DonutChart
                data={articlesQuantityByCategoriesData}
                labels={categoryLabels}
                title={t('Cтатті за категоріями, %')}
                legendPosition="bottom"
            />
            <DonutChart
                data={articleViewsByCategoriesData}
                labels={categoryLabels}
                title={t('Перегляди статей за категоріями, %')}
                legendPosition="bottom"
            />
        </HStack>
    );
};
