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

interface quatersData {
    [quarter: string]: ArticlesCategoryNumberData;
}

interface barChartDataObject {
    name: string;
    data: number[];
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

    // const getQuarter = (month: number) => {
    //     if (month >= 1 && month <= 3) return 'Q1';
    //     if (month >= 4 && month <= 6) return 'Q2';
    //     if (month >= 7 && month <= 9) return 'Q3';
    //     if (month >= 10 && month <= 12) return 'Q4';
    //     return '';
    // };
    // const years = new Set();
    // const categories: Set<string> = new Set();
    // articles?.forEach((article) => {
    //     const year = article.createdAt.split('.')[2];
    //     years.add(year);
    //     article.category.forEach((category) => categories.add(category));
    // });
    // const sortedYears = Array.from(years).sort();
    // const allCategories = Array.from(categories);
    // const r: quatersData = {};
    // sortedYears.forEach((year) => {
    //     ['Q1', 'Q2', 'Q3', 'Q4'].forEach((quarter) => {
    //         const key = `${quarter}/${year}`;
    //         r[key] = {};
    //         allCategories.forEach((category) => {
    //             r[key][category] = 0;
    //         });
    //     });
    // });
    // articles?.forEach((article) => {
    //     const [day, month, year] = article.createdAt.split('.').map(Number); // Parse the date
    //     const quarter = getQuarter(month);
    //     const key = `${quarter}/${year}`; // Construct the quarter-year key
    //
    //     // Update category counts for this article's quarter
    //     article.category.forEach((category) => {
    //         r[key][category] += 1;
    //     });
    // });
    //
    // const periodLabels = Object.keys(r);
    //
    // const arr: barChartDataObject[] = allCategories.map((category) => {
    //     // Collect the data for this category across all quarters
    //     const data = Object.values(r).map((quarter) => quarter[category]);
    //     // Return an object with the name and data array
    //     return { name: category, data };
    // });
    //
    // console.log(arr);

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
