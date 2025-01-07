import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { ArticlePeriodDataChartsProps } from '../../index';
import { formatToTwoDigits } from '@/shared/lib/text/formatToTwoDigits/formatToTwoDigits';
import { CategoryData } from '../../model/types/types';

type DataByPeriod = ArticlePeriodDataChartsProps['data'];

export const useArticlePeriodData = (
    categories: string[],
    data: DataByPeriod,
): {
    quarterlyCategoryData: { name: string; data: number[] }[];
    quarterlyLabels: string[];
    monthlyLabels: string[];
    monthlyCategoryData: { name: string; data: number[] }[];
} => {
    const { t } = useTranslation('admin');

    const monthToQuarterMap: Record<string, string> = {
        '01': `${t('Q')}1`,
        '02': `${t('Q')}1`,
        '03': `${t('Q')}1`,
        '04': `${t('Q')}2`,
        '05': `${t('Q')}2`,
        '06': `${t('Q')}2`,
        '07': `${t('Q')}3`,
        '08': `${t('Q')}3`,
        '09': `${t('Q')}3`,
        '10': `${t('Q')}4`,
        '11': `${t('Q')}4`,
        '12': `${t('Q')}4`,
    };

    const initializeCategoryData = useCallback(
        (): CategoryData =>
            Object.fromEntries(categories.map((category) => [category, 0])),
        [categories],
    );

    const { categoryDataByQuarters, accumCategoryDataByMonths } =
        Object.entries(data).reduce(
            (acc, [key, value], index, entries) => {
                const [monthStr, yearStr] = key.split('/');
                const month = formatToTwoDigits(monthStr);
                const year = Number(yearStr);
                const quarterKey = `${monthToQuarterMap[month]}/${year}`;

                if (!acc.categoryDataByQuarters[quarterKey]) {
                    acc.categoryDataByQuarters[quarterKey] =
                        initializeCategoryData();
                }

                if (!acc.accumCategoryDataByMonths[key]) {
                    acc.accumCategoryDataByMonths[key] =
                        initializeCategoryData();
                }

                categories.forEach((category) => {
                    const categoryValue = value[category] ?? 0;

                    acc.categoryDataByQuarters[quarterKey][category] +=
                        categoryValue;

                    const previousMonthValue =
                        index > 0
                            ? acc.accumCategoryDataByMonths[
                                  entries[index - 1][0]
                              ][category]
                            : 0;

                    acc.accumCategoryDataByMonths[key][category] =
                        categoryValue + previousMonthValue;
                });

                return acc;
            },
            {
                categoryDataByQuarters: {} as DataByPeriod,
                accumCategoryDataByMonths: {} as DataByPeriod,
            },
        );

    const quarterlyCategoryData = useMemo(
        () =>
            categories.map((category) => ({
                name: category,
                data: Object.values(categoryDataByQuarters).map(
                    (quarter) => quarter[category],
                ),
            })),
        [categories, categoryDataByQuarters],
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

    const quarterlyLabels = useMemo(
        () => Object.keys(categoryDataByQuarters),
        [categoryDataByQuarters],
    );
    const monthlyLabels = useMemo(() => Object.keys(data), [data]);

    return {
        quarterlyCategoryData,
        quarterlyLabels,
        monthlyLabels,
        monthlyCategoryData,
    };
};
