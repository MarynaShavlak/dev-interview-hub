import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { Article, useArticles } from '@/entities/Article';

interface QuarterlyData {
    [key: string]: number;
}

interface QuarterlyCount {
    [key: string]: QuarterlyData;
}

interface ChartData {
    name: string;
    data: number[];
}

interface UseArticleQuarterlyDataProps {
    isAccumulated?: boolean;
}

export const useArticleQuarterlyData = (
    props: UseArticleQuarterlyDataProps,
) => {
    const { isAccumulated = false } = props;
    const { t } = useTranslation('admin');
    const { data: articles, isLoading } = useArticles(null);

    const getQuarter = useCallback(
        (month: number): string => {
            if (month >= 1 && month <= 3) return `${t('Q')}1`;
            if (month >= 4 && month <= 6) return `${t('Q')}2`;
            if (month >= 7 && month <= 9) return `${t('Q')}3`;
            if (month >= 10 && month <= 12) return `${t('Q')}4`;
            return '';
        },
        [t],
    );

    const getQuartersList = useCallback(() => {
        return Array.from({ length: 4 }, (_, index) => `${t('Q')}${index + 1}`);
    }, [t]);

    const extractYearsAndCategories = useCallback(
        (articles: Article[]) => {
            const years = new Set<string>();
            const categories = new Set<string>();

            articles.forEach((article) => {
                const year = article.createdAt.split('.')[2]; // Extract year
                years.add(year);
                article.category.forEach((cat: string) => categories.add(cat));
            });

            return {
                years: Array.from(years).sort(),
                categories: Array.from(categories).map((cat) => t(`${cat}`)),
            };
        },
        [t],
    );

    const initializeQuarterlyData = useCallback(
        (years: string[], categories: string[]): QuarterlyCount => {
            const quarterlyData: QuarterlyCount = {};

            years.forEach((year) => {
                getQuartersList().forEach((quarter) => {
                    const key = `${quarter}/${year}`;
                    quarterlyData[key] = categories.reduce((acc, category) => {
                        acc[category] = 0; // Initialize category count to 0
                        return acc;
                    }, {} as QuarterlyData);
                });
            });

            return quarterlyData;
        },
        [getQuartersList],
    );

    const processQuarterlyData = useCallback(
        (
            articles: Article[] | undefined,
            initialData: QuarterlyCount,
            accumulate: boolean,
        ) => {
            const processedData: QuarterlyCount = { ...initialData };

            articles?.forEach((article) => {
                const [day, month, year] = article.createdAt
                    .split('.')
                    .map(Number);
                const quarter = getQuarter(month);
                const key = `${quarter}/${year}`;

                article.category.forEach((category: string) => {
                    if (processedData[key]) {
                        const localeCategory = t(`${category}`);
                        processedData[key][localeCategory] += 1;
                    }
                });
            });

            if (accumulate) {
                Object.keys(processedData).forEach((key, index, keys) => {
                    if (index > 0) {
                        const previousKey = keys[index - 1];
                        Object.keys(processedData[key]).forEach((category) => {
                            processedData[key][category] +=
                                processedData[previousKey][category];
                        });
                    }
                });
            }

            return processedData;
        },
        [getQuarter, t],
    );

    const { years, categories } = useMemo(
        () => extractYearsAndCategories(articles || []),
        [articles, extractYearsAndCategories],
    );

    const quarterlyData = useMemo(() => {
        return initializeQuarterlyData(years, categories);
    }, [years, categories, initializeQuarterlyData]);

    const processedQuarterlyData = useMemo(() => {
        const initialData = { ...quarterlyData };
        return processQuarterlyData(articles, initialData, isAccumulated);
    }, [articles, quarterlyData, processQuarterlyData, isAccumulated]);

    const periodLabels = Object.keys(processedQuarterlyData);

    const chartData: ChartData[] = useMemo(() => {
        return categories.map((category) => {
            const data = Object.values(processedQuarterlyData).map(
                (quarter) => quarter[category],
            );
            return { name: category, data };
        });
    }, [categories, processedQuarterlyData]);

    return {
        periodLabels,
        chartData,
    };
};
