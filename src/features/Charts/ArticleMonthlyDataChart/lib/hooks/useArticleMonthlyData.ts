import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';

import { formatToTwoDigits } from '@/shared/lib/text/formatToTwoDigits/formatToTwoDigits';
import {
    ArticleMonthlyDataChartProps,
    CategoryData,
} from '../../model/types/types';

type DataByPeriod = ArticleMonthlyDataChartProps['data'];

export const useArticleMonthlyData = (
    categories: string[],
    data: DataByPeriod,
): {
    monthlyLabels: string[];
    monthlyCategoryData: { name: string; data: number[] }[];
} => {
    const { t } = useTranslation('admin');

    const initializeCategoryData = useCallback(
        (): CategoryData =>
            Object.fromEntries(categories.map((category) => [category, 0])),
        [categories],
    );

    const { accumCategoryDataByMonths } = Object.entries(data).reduce(
        (acc, [key, value], index, entries) => {
            const [monthStr, yearStr] = key.split('/');
            const month = formatToTwoDigits(monthStr);
            const year = Number(yearStr);

            if (!acc.accumCategoryDataByMonths[key]) {
                acc.accumCategoryDataByMonths[key] = initializeCategoryData();
            }

            categories.forEach((category) => {
                const categoryValue = value[category] ?? 0;

                const previousMonthValue =
                    index > 0
                        ? acc.accumCategoryDataByMonths[entries[index - 1][0]][
                              category
                          ]
                        : 0;

                acc.accumCategoryDataByMonths[key][category] =
                    categoryValue + previousMonthValue;
            });

            return acc;
        },
        {
            accumCategoryDataByMonths: {} as DataByPeriod,
        },
    );

    const monthlyCategoryData = useMemo(
        () =>
            categories.map((category) => ({
                name: category,
                data: Object.values(accumCategoryDataByMonths).map(
                    (month) => month[category],
                ),
            })),
        [accumCategoryDataByMonths, categories],
    );

    const monthlyLabels = useMemo(() => Object.keys(data), [data]);

    return {
        monthlyLabels,
        monthlyCategoryData,
    };
};
