export type CategoryData = Record<string, number>;

export interface ArticlePeriodDataChartsProps {
    categories: string[];
    data: Record<string, CategoryData>;

    className?: string;
}
