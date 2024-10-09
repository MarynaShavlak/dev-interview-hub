import { ArticleCommentCount } from '../../../model/types/stats';
import { ArticleCommentsChartsProps } from '@/features/ArticleCommentsCharts';

export const useArticleCommentsChartData = (
    articleCommentCounts: ArticleCommentCount[],
    commentCountsByUser: Record<string, number>,
): ArticleCommentsChartsProps => {
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
