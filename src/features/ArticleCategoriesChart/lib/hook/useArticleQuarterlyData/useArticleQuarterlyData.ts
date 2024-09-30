import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { Article, useArticles } from '@/entities/Article';

interface CategoryData {
    [category: string]: number;
}

interface QuarterlyData {
    [quarter: string]: CategoryData;
}

interface ChartData {
    name: string;
    data: number[];
}

export const useArticleQuarterlyData = () => {
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
        (years: string[], categories: string[]): QuarterlyData => {
            const quarterlyData: QuarterlyData = {};

            years.forEach((year) => {
                getQuartersList().forEach((quarter) => {
                    const key = `${quarter}/${year}`;
                    quarterlyData[key] = categories.reduce((acc, category) => {
                        acc[category] = 0; // Initialize category count to 0
                        return acc;
                    }, {} as CategoryData);
                });
            });

            return quarterlyData;
        },
        [getQuartersList],
    );

    const populateQuarterlyData = useCallback(
        (articles: Article[] | undefined, quarterlyData: QuarterlyData) => {
            articles?.forEach((article) => {
                const [day, month, year] = article.createdAt
                    .split('.')
                    .map(Number);
                const quarter = getQuarter(month);
                const key = `${quarter}/${year}`;

                article.category.forEach((category: string) => {
                    if (quarterlyData[key] && category in quarterlyData[key]) {
                        quarterlyData[key][category] += 1;
                    }
                });
            });

            return quarterlyData;
        },
        [getQuarter],
    );

    const { years, categories } = useMemo(
        () => extractYearsAndCategories(articles || []),
        [articles, extractYearsAndCategories],
    );

    console.log('categories', categories);
    const quarterlyData = useMemo(() => {
        return initializeQuarterlyData(years, categories);
    }, [years, categories, initializeQuarterlyData]);

    const populatedQuarterlyData = useMemo(() => {
        return populateQuarterlyData(articles, quarterlyData);
    }, [articles, quarterlyData, populateQuarterlyData]);

    const periodLabels = Object.keys(populatedQuarterlyData);

    const chartData: ChartData[] = useMemo(() => {
        return categories.map((category) => {
            const data = Object.values(populatedQuarterlyData).map(
                (quarter) => quarter[category],
            );
            return { name: category, data };
        });
    }, [categories, populatedQuarterlyData]);

    return {
        periodLabels,
        chartData,
    };
};
