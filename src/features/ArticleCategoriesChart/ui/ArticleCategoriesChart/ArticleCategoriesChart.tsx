import React from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { DonutChart } from '@/shared/ui/common/Charts/DonutChart/DonutChart';
import { useArticles } from '@/entities/Article';
import { BarChart } from '@/shared/ui/common/Charts/BarChart';

export interface ArticlesCategoryNumberData {
    [category: string]: number;
}

export interface ArticlesCategoryArrayData {
    [category: string]: string[];
}

export const ArticleCategoriesChart = () => {
    const { t } = useTranslation('admin');
    const { data: articles, isLoading: isArticlesLoading } = useArticles(null);

    const categoryCount: ArticlesCategoryNumberData = {};
    const categoryViews: ArticlesCategoryNumberData = {};
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
    const labels = Object.keys(categoryCount).map((key) => {
        return t(`${key}`);
    });
    const seriesCategoryCount = Object.values(categoryCount);
    const seriesViewsByCategory = Object.values(categoryViews);
    // _________________________________________________________
    // const articlesCreationDates: ArticlesCategoryArrayData = {};

    // articles?.forEach((article) => {
    //     article.category.forEach((category) => {
    //         if (!articlesCreationDates[category]) {
    //             articlesCreationDates[category] = [];
    //         }
    //         articlesCreationDates[category].push(article.createdAt);
    //     });
    // });

    // console.log(articlesCreationDates);

    // let allStrings: string[] = [];
    //
    // // Loop through each property in the object
    // Object.values(articlesCreationDates).forEach((dateArray) => {
    //     allStrings = allStrings.concat(dateArray);
    // });

    // Step 2: Remove duplicates by converting to a Set, then back to an array
    // const uniqueStrings = [...new Set(allStrings)];

    // console.log(uniqueStrings);

    // const result = Object.keys(articlesCreationDates).map((category) => {
    //     // For each category, map the uniqueDates to a count (0 or 1)
    //     const data = uniqueStrings.map((date) =>
    //         articlesCreationDates[category].includes(date) ? 1 : 0,
    //     );
    //
    //     return { name: category, data };
    // });
    //
    // console.log('result', result);

    /// //////////////////////////////////

    // Helper function to get the quarter from a date
    const getQuarter = (month: number) => {
        if (month >= 1 && month <= 3) return 'Q1';
        if (month >= 4 && month <= 6) return 'Q2';
        if (month >= 7 && month <= 9) return 'Q3';
        if (month >= 10 && month <= 12) return 'Q4';
        return '';
    };

    // Get all years and categories
    const years = new Set();
    const categories: Set<string> = new Set();

    // Populate years and categories
    articles?.forEach((article) => {
        const year = article.createdAt.split('.')[2]; // Extract year from the date
        years.add(year);
        article.category.forEach((category) => categories.add(category));
    });

    interface quatersData {
        [quarter: string]: ArticlesCategoryNumberData;
    }

    // Convert sets to arrays
    const sortedYears = Array.from(years).sort();
    const allCategories = Array.from(categories);
    // Initialize result object with all quarters from the years
    const r: quatersData = {};

    // Initialize all quarters for each year
    sortedYears.forEach((year) => {
        ['Q1', 'Q2', 'Q3', 'Q4'].forEach((quarter) => {
            const key = `${quarter}/${year}`;
            r[key] = {};
            allCategories.forEach((category) => {
                r[key][category] = 0;
            });
        });
    });

    // Iterate over articles and update the result object
    articles?.forEach((article) => {
        const [day, month, year] = article.createdAt.split('.').map(Number); // Parse the date
        const quarter = getQuarter(month);
        const key = `${quarter}/${year}`; // Construct the quarter-year key

        // Update category counts for this article's quarter
        article.category.forEach((category) => {
            r[key][category] += 1;
        });
    });

    console.log(r);
    const labelsBarChart = Object.keys(r);
    console.log('labelsBarChart', labelsBarChart);

    interface barChartDataObject {
        name: string;
        data: number[];
    }

    // Create an array to hold the final result
    const arr: barChartDataObject[] = allCategories.map((category) => {
        // Collect the data for this category across all quarters
        const data = Object.values(r).map((quarter) => quarter[category]);
        // Return an object with the name and data array
        return { name: category, data };
    });

    console.log(arr);

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
            <BarChart
                data={arr}
                labels={labelsBarChart}
                title={t('Динаміка кількості статей')}
                legendPosition="bottom"
                xAxisTitle={t('Місяць')}
                yAxisTitle={t('Кількість статей')}
                height="500"
            />
        </VStack>
    );
};
