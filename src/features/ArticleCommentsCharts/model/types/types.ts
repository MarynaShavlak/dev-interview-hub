export interface ArticleCommentCount {
    articleId: string;
    commentCount: number;
}

export interface ArticleCommentsChartsProps {
    articleCommentCounts: ArticleCommentCount[];
    commentCountsByUser: Record<string, number>;
    className?: string;
}
