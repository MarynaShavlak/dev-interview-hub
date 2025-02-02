export interface ArticleCommentCount {
    articleId: string;
    commentCount: number;
    articleTitle: string;
}

export interface ArticleCommentsChartsProps {
    articleCommentCounts: ArticleCommentCount[];
    commentCountsByUser: Record<string, number>;
    className?: string;
    isRatingChart?: boolean;
    isDistributionChart?: boolean;
}
