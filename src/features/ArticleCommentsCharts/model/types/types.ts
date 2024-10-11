export interface ArticleCommentCount {
    articleId: string;
    commentCount: number;
}

export interface ArticleCommentsChartsProps {
    articleCommentCounts: ArticleCommentCount[];
    commentCountsByUser: Record<string, number>;
    // labels: string[];
    // commentsByArticlesData: number[];
    // commentsByUsersData: { x: string; y: number }[];
}
