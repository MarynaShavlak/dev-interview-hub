export interface ArticleStats {
    [key: string]: number;
}

export interface ArticleCategoriesChartsProps {
    // labels: string[];
    // articlesByCategories: number[];
    // viewsByCategories: number[];
    data: Record<string, ArticleStats>;
}
