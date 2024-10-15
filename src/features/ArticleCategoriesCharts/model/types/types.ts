export interface ArticleStats {
    [key: string]: number;
}

export interface ArticleCategoriesChartsProps {
    data: Record<string, ArticleStats>;
    className?: string;
}
