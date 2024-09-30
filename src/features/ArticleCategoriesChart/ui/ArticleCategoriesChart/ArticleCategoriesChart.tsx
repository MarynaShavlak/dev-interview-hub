import React from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { DonutChart } from '@/shared/ui/common/Charts/DonutChart/DonutChart';
import { useArticles } from '@/entities/Article';
import { StackedColumnsChart } from '@/shared/ui/common/Charts/StackedColumnsChart';
import { useArticleCategoryData } from '../../lib/hook/useArticleCategoryData/useArticleCategoryData';
import { useArticleQuarterlyData } from '../../lib/hook/useArticleQuarterlyData/useArticleQuarterlyData';

export interface ArticlesCategoryNumberData {
    [category: string]: number;
}

export const ArticleCategoriesChart = () => {
    const { t } = useTranslation('admin');
    const { data: articles, isLoading: isArticlesLoading } = useArticles(null);

    const {
        labels: categoryLabels,
        articleData: articlesQuantityByCategoriesData,
        viewData: articleViewsByCategoriesData,
    } = useArticleCategoryData();

    const { periodLabels, chartData } = useArticleQuarterlyData();

    return (
        <VStack gap="24">
            <HStack gap="24">
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
            <StackedColumnsChart
                data={chartData}
                labels={periodLabels}
                title={t('Динаміка кількості статей')}
                legendPosition="top"
                xAxisTitle={t('Місяць')}
                yAxisTitle={t('Кількість статей')}
                height="500"
                width="700"
            />
            {/* <BarChart */}
            {/*    data={chartData} */}
            {/*    labels={periodLabels} */}
            {/*    title={t('Топ-10 статей за кількістю коментарів')} */}
            {/*    legendPosition="top" */}
            {/*    xAxisTitle={t('ID статті')} */}
            {/*    yAxisTitle={t('Кількість коментарів')} */}
            {/*    height="500" */}
            {/*    width="700" */}
            {/* /> */}
        </VStack>
    );
};
