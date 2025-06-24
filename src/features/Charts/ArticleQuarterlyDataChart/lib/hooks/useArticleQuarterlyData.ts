import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { formatToTwoDigits } from '@/shared/lib/text/formatToTwoDigits/formatToTwoDigits';
import {
    ArticleQuarterlyDataChartProps,
    CategoryData,
} from '../../model/types/types';

type DataByPeriod = ArticleQuarterlyDataChartProps['data'];

export const useArticleQuarterlyData = (
    categories: string[],
    data: DataByPeriod,
): {
    quarterlyCategoryData: { name: string; data: number[] }[];
    quarterlyLabels: string[];
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

    const { categoryDataByQuarters } = Object.entries(data).reduce(
        (acc, [key, value], index, entries) => {
            const [monthStr, yearStr] = key.split('/');
            const month = formatToTwoDigits(monthStr);
            const year = Number(yearStr);
            const quarterKey = `${monthToQuarterMap[month]}/${year}`;

            if (!acc.categoryDataByQuarters[quarterKey]) {
                acc.categoryDataByQuarters[quarterKey] =
                    initializeCategoryData();
            }

            categories.forEach((category) => {
                const categoryValue = value[category] ?? 0;

                acc.categoryDataByQuarters[quarterKey][category] +=
                    categoryValue;
            });

            return acc;
        },
        {
            categoryDataByQuarters: {} as DataByPeriod,
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

    const quarterlyLabels = useMemo(
        () => Object.keys(categoryDataByQuarters),
        [categoryDataByQuarters],
    );

    return {
        quarterlyCategoryData,
        quarterlyLabels,
    };
};
