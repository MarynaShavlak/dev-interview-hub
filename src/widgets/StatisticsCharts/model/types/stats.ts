export interface ArticleStats {
    [key: string]: number;
}

export interface ArticleCommentCount {
    articleId: string;
    commentCount: number;
}

export interface ActiveUsersList {
    inArticles: Set<string>;
    inComments: Set<string>;
    inRatings: Set<string>;
}

export interface ActiveArticlesList {
    withRating: Set<string>;
    withFeedback: Set<string>;
    withComments: Set<string>;
}

export interface DashboardPctDataStats {
    articlesWithCommentsPercentage: number;
    articlesWithFeedbackPercentage: number;
}

export interface InitializedData {
    totalArticles: number;
    totalUsers: number;
    averageRating: number;
    averageViews: number;
    categoryData: Record<string, ArticleStats>;
    articleCommentCounts: ArticleCommentCount[];
    commentCountsByArticle: Record<string, number>;
    commentCountsByUser: Record<string, number>;
    ratingCountsByUser: Record<string, ArticleStats>;
    activeUsersList: ActiveUsersList;
    activeArticlesList: ActiveArticlesList;
    ratingDistributionMap: Map<number, number>;
}
