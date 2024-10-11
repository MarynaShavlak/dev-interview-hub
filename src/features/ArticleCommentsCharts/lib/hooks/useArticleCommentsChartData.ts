import { ArticleCommentsChartsProps } from '../..';

export const useArticleCommentsChartData = (
    articleCommentCounts: ArticleCommentsChartsProps['articleCommentCounts'],
    commentCountsByUser: ArticleCommentsChartsProps['commentCountsByUser'],
): {
    labels: string[];
    commentsByArticlesData: number[];
    commentsByUsersData: { x: string; y: number }[];
} => {
    const labels: string[] = [];
    const commentsByArticlesData: number[] = [];

    articleCommentCounts.forEach(({ articleId, commentCount }) => {
        labels.push(articleId);
        commentsByArticlesData.push(commentCount);
    });

    const commentsByUsersData = Object.entries(commentCountsByUser)
        .map(([username, commentCount]) => ({ x: username, y: commentCount }))
        .sort((a, b) => b.y - a.y);

    return {
        labels,
        commentsByArticlesData,
        commentsByUsersData,
    };
};
