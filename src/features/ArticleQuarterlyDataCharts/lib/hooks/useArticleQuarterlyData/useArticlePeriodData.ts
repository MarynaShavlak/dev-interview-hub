import { useTranslation } from 'react-i18next';
import { ArticlePeriodDataChartsProps } from '../../..';
import { formatMonth } from '@/shared/lib/text/formatMonth/formatMonth';

type CategoryData = Record<string, number>;

export const useArticlePeriodData = (
    categories: string[],
    data: ArticlePeriodDataChartsProps['data'],
) => {
    const { t } = useTranslation('admin');

    // Initialize mapping from months to quarters
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

    const initializeCategoryData = (): CategoryData =>
        Object.fromEntries(categories.map((category) => [category, 0]));

    const categoryDataByQuarters: ArticlePeriodDataChartsProps['data'] = {};
    const accumCategoryDataByMonths: ArticlePeriodDataChartsProps['data'] = {};

    // Process data in a single pass
    Object.entries(data).forEach(([key, value], index, entries) => {
        const [monthStr, yearStr] = key.split('/');
        const month = formatMonth(monthStr);
        const year = Number(yearStr);
        const quarterKey = `${monthToQuarterMap[month]}/${year}`;

        if (!categoryDataByQuarters[quarterKey]) {
            categoryDataByQuarters[quarterKey] = initializeCategoryData();
        }

        if (!accumCategoryDataByMonths[key]) {
            accumCategoryDataByMonths[key] = initializeCategoryData();
        }

        categories.forEach((category) => {
            if (value[category] !== undefined) {
                categoryDataByQuarters[quarterKey][category] += value[category];

                accumCategoryDataByMonths[key][category] =
                    value[category] +
                    (index > 0
                        ? accumCategoryDataByMonths[entries[index - 1][0]][
                              category
                          ]
                        : 0);
            }
        });
    });

    const quarterlyCategoryData = categories.map((category) => ({
        name: category,
        data: Object.values(categoryDataByQuarters).map(
            (quarter) => quarter[category],
        ),
    }));

    const monthlyCategoryData = categories.map((category) => ({
        name: category,
        data: Object.values(accumCategoryDataByMonths).map(
            (month) => month[category],
        ),
    }));

    const quarterlyLabels = Object.keys(categoryDataByQuarters);
    const monthlyLabels = Object.keys(data);

    return {
        quarterlyCategoryData,
        quarterlyLabels,
        monthlyLabels,
        monthlyCategoryData,
    };
};

// export const useArticlePeriodData = (
//     categories: string[],
//     data: ArticlePeriodDataChartsProps['data'],
// ) => {
//     console.log('data in hook:', data);
//     const { t } = useTranslation('admin');
//     const categoryDataByQuarters: ArticlePeriodDataChartsProps['data'] = {};
//     let accumCategoryDataByMonths: ArticlePeriodDataChartsProps['data'] = {};
//
//     const initializeCategoryData = (): CategoryData => {
//         return categories.reduce((acc, category) => {
//             acc[category] = 0;
//             return acc;
//         }, {} as CategoryData);
//     };
//
//     const monthToQuarterMap: Record<string, string> = {
//         '01': 'Q1',
//         '02': 'Q1',
//         '03': 'Q1',
//         '04': 'Q2',
//         '05': 'Q2',
//         '06': 'Q2',
//         '07': 'Q3',
//         '08': 'Q3',
//         '09': 'Q3',
//         '10': 'Q4',
//         '11': 'Q4',
//         '12': 'Q4',
//     };
//
//     Object.entries(data).forEach(([key, value]) => {
//         const [monthStr, yearStr] = key.split('/');
//         const month = String(monthStr).padStart(2, '0');
//
//         const year = Number(yearStr);
//         const quarterKey = `${monthToQuarterMap[month]}/${year}`;
//         if (!categoryDataByQuarters[quarterKey]) {
//             categoryDataByQuarters[quarterKey] = initializeCategoryData();
//         }
//
//         categories.forEach((category) => {
//             if (value[category] !== undefined) {
//                 categoryDataByQuarters[quarterKey][category] += value[category];
//             }
//         });
//     });
//
//     accumCategoryDataByMonths = JSON.parse(JSON.stringify(data));
//
//     console.log('accumCategoryDataByMonths', accumCategoryDataByMonths);
//
//     Object.keys(accumCategoryDataByMonths).forEach((key, index, keys) => {
//         if (index > 0) {
//             const previousKey = keys[index - 1];
//             Object.keys(accumCategoryDataByMonths[key]).forEach((category) => {
//                 accumCategoryDataByMonths[key][category] +=
//                     accumCategoryDataByMonths[previousKey][category];
//             });
//         }
//     });
//
//     console.log('accumCategoryDataByMonths', accumCategoryDataByMonths);
//
//     const quarterlyCategoryData = categories.map((category) => {
//         const data = Object.values(categoryDataByQuarters).map(
//             (quarter) => quarter[category],
//         );
//         return { name: category, data };
//     });
//
//     const monthlyCategoryData = categories.map((category) => {
//         const data = Object.values(accumCategoryDataByMonths).map(
//             (quarter) => quarter[category],
//         );
//         return { name: category, data };
//     });
//
//     const quarterlyLabels = Object.keys(categoryDataByQuarters);
//     const monthlyLabels = Object.keys(data);
//     return {
//         quarterlyCategoryData,
//         quarterlyLabels,
//         monthlyLabels,
//         monthlyCategoryData,
//     };
// };

// _________________________________________________________________-
// const getQuarter = (month: number): string => {
//     if (month >= 1 && month <= 3) return `${t('Q')}1`;
//     if (month >= 4 && month <= 6) return `${t('Q')}2`;
//     if (month >= 7 && month <= 9) return `${t('Q')}3`;
//     if (month >= 10 && month <= 12) return `${t('Q')}4`;
//     return '';
// };
//
// const getQuartersList = () => {
//     return Array.from({ length: 4 }, (_, index) => `${t('Q')}${index + 1}`);
// };

// const initializeQuarterlyData = useCallback(
//     (years: string[], categories: string[]): QuarterlyCount => {
//         const quarterlyData: QuarterlyCount = {};
//
//         years.forEach((year) => {
//             getQuartersList().forEach((quarter) => {
//                 const key = `${quarter}/${year}`;
//                 quarterlyData[key] = categories.reduce((acc, category) => {
//                     acc[category] = 0; // Initialize category count to 0
//                     return acc;
//                 }, {} as QuarterlyData);
//             });
//         });
//
//         return quarterlyData;
//     },
//     [getQuartersList],
// );
//
// const processQuarterlyData = useCallback(
//     (
//         articles: Article[] | undefined,
//         initialData: QuarterlyCount,
//         accumulate: boolean,
//     ) => {
//         const processedData: QuarterlyCount = { ...initialData };
//
//         articles?.forEach((article) => {
//             const [day, month, year] = article.createdAt
//                 .split('.')
//                 .map(Number);
//             const quarter = getQuarter(month);
//             const key = `${quarter}/${year}`;
//
//             article.category.forEach((category: string) => {
//                 if (processedData[key]) {
//                     const localeCategory = t(`${category}`);
//                     processedData[key][localeCategory] += 1;
//                 }
//             });
//         });
//
//         if (accumulate) {
//             Object.keys(processedData).forEach((key, index, keys) => {
//                 if (index > 0) {
//                     const previousKey = keys[index - 1];
//                     Object.keys(processedData[key]).forEach((category) => {
//                         processedData[key][category] +=
//                             processedData[previousKey][category];
//                     });
//                 }
//             });
//         }
//
//         return processedData;
//     },
//     [getQuarter, t],
// );
//
// const { years, categories } = useMemo(
//     () => extractYearsAndCategories(articles || []),
//     [articles, extractYearsAndCategories],
// );
//
// const quarterlyData = useMemo(() => {
//     return initializeQuarterlyData(years, categories);
// }, [years, categories, initializeQuarterlyData]);
//
// // console.log('quarterlyData', quarterlyData);
// const processedQuarterlyData = useMemo(() => {
//     const initialData = { ...quarterlyData };
//     return processQuarterlyData(articles, initialData, isAccumulated);
// }, [articles, quarterlyData, processQuarterlyData, isAccumulated]);
//
// const periodLabels = Object.keys(processedQuarterlyData);

// const chartData: ChartData[] = useMemo(() => {
//     return categories.map((category) => {
//         const d = Object.values(data).map((quarter) => quarter[category]);
//         return { name: category, data: d };
//     });
// }, [categories, data]);
//
// return {
//     chartData,
// };
// };

// export const useArticlePeriodData = (
//     props: UseArticlePeriodDataProps,
// ) => {
//     const { isAccumulated = false } = props;
//     const { t } = useTranslation('admin');
//     const { data: articles, isLoading } = useArticles(null);
//
//     const getQuarter = useCallback(
//         (month: number): string => {
//             if (month >= 1 && month <= 3) return `${t('Q')}1`;
//             if (month >= 4 && month <= 6) return `${t('Q')}2`;
//             if (month >= 7 && month <= 9) return `${t('Q')}3`;
//             if (month >= 10 && month <= 12) return `${t('Q')}4`;
//             return '';
//         },
//         [t],
//     );
//
//     const getQuartersList = useCallback(() => {
//         return Array.from({ length: 4 }, (_, index) => `${t('Q')}${index + 1}`);
//     }, [t]);
//
//     const extractYearsAndCategories = useCallback(
//         (articles: Article[]) => {
//             const years = new Set<string>();
//             const categories = new Set<string>();
//
//             articles.forEach((article) => {
//                 const year = article.createdAt.split('.')[2]; // Extract year
//                 years.add(year);
//                 article.category.forEach((cat: string) => categories.add(cat));
//             });
//
//             return {
//                 years: Array.from(years).sort(),
//                 categories: Array.from(categories).map((cat) => t(`${cat}`)),
//             };
//         },
//         [t],
//     );
//
//     const initializeQuarterlyData = useCallback(
//         (years: string[], categories: string[]): QuarterlyCount => {
//             const quarterlyData: QuarterlyCount = {};
//
//             years.forEach((year) => {
//                 getQuartersList().forEach((quarter) => {
//                     const key = `${quarter}/${year}`;
//                     quarterlyData[key] = categories.reduce((acc, category) => {
//                         acc[category] = 0; // Initialize category count to 0
//                         return acc;
//                     }, {} as QuarterlyData);
//                 });
//             });
//
//             return quarterlyData;
//         },
//         [getQuartersList],
//     );
//
//     const processQuarterlyData = useCallback(
//         (
//             articles: Article[] | undefined,
//             initialData: QuarterlyCount,
//             accumulate: boolean,
//         ) => {
//             const processedData: QuarterlyCount = { ...initialData };
//
//             articles?.forEach((article) => {
//                 const [day, month, year] = article.createdAt
//                     .split('.')
//                     .map(Number);
//                 const quarter = getQuarter(month);
//                 const key = `${quarter}/${year}`;
//
//                 article.category.forEach((category: string) => {
//                     if (processedData[key]) {
//                         const localeCategory = t(`${category}`);
//                         processedData[key][localeCategory] += 1;
//                     }
//                 });
//             });
//
//             if (accumulate) {
//                 Object.keys(processedData).forEach((key, index, keys) => {
//                     if (index > 0) {
//                         const previousKey = keys[index - 1];
//                         Object.keys(processedData[key]).forEach((category) => {
//                             processedData[key][category] +=
//                                 processedData[previousKey][category];
//                         });
//                     }
//                 });
//             }
//
//             return processedData;
//         },
//         [getQuarter, t],
//     );
//
//     const { years, categories } = useMemo(
//         () => extractYearsAndCategories(articles || []),
//         [articles, extractYearsAndCategories],
//     );
//
//     const quarterlyData = useMemo(() => {
//         return initializeQuarterlyData(years, categories);
//     }, [years, categories, initializeQuarterlyData]);
//
//     // console.log('quarterlyData', quarterlyData);
//     const processedQuarterlyData = useMemo(() => {
//         const initialData = { ...quarterlyData };
//         return processQuarterlyData(articles, initialData, isAccumulated);
//     }, [articles, quarterlyData, processQuarterlyData, isAccumulated]);
//
//     const periodLabels = Object.keys(processedQuarterlyData);
//
//     const chartData: ChartData[] = useMemo(() => {
//         return categories.map((category) => {
//             const data = Object.values(processedQuarterlyData).map(
//                 (quarter) => quarter[category],
//             );
//             return { name: category, data };
//         });
//     }, [categories, processedQuarterlyData]);
//
//     return {
//         periodLabels,
//         chartData,
//     };
// };
