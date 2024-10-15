export interface ArticleStats {
    [key: string]: number;
}

export interface UserRatingsBubbleChartProps {
    data: Record<string, ArticleStats>;
    totalArticles: number;
    className?: string;
}
