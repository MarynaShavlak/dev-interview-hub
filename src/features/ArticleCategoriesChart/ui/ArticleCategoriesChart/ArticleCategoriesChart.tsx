import React from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { DonutChart } from '@/shared/ui/common/Charts/DonutChart/DonutChart';
import { useArticles } from '@/entities/Article';

export interface ArticlesCategoryCount {
    [category: string]: number;
}

export interface ArticlesCategoryViews {
    [category: string]: number;
}

export const ArticleCategoriesChart = () => {
    const { t } = useTranslation('admin');
    const { data: articles, isLoading: isArticlesLoading } = useArticles(null);

    const categoryCount: ArticlesCategoryCount = {};
    const categoryViews: ArticlesCategoryViews = {};

    articles?.forEach((article) => {
        article.category.forEach((category) => {
            categoryCount[category] = (categoryCount[category] || 0) + 1;
        });
    });

    articles?.forEach((article) => {
        article.category.forEach((category) => {
            categoryViews[category] =
                (categoryViews[category] || 0) + article.views;
        });
    });
    console.log(categoryViews);

    const labels = Object.keys(categoryCount).map((key) => {
        return t(`${key}`);
    });
    const seriesCategoryCount = Object.values(categoryCount);
    const seriesViewsByCategory = Object.values(categoryViews);

    return (
        <VStack gap="24">
            <HStack gap="24">
                <DonutChart
                    data={seriesCategoryCount}
                    labels={labels}
                    title={t('Cтатті за категоріями, %')}
                    legendPosition="bottom"
                />
                <DonutChart
                    data={seriesViewsByCategory}
                    labels={labels}
                    title={t('Перегляди статей за категоріями, %')}
                    legendPosition="bottom"
                />
            </HStack>
        </VStack>
    );
};
