import { TopCommentedArticlesChartProps } from '../../model/types/types';

export const useCommentsByArticlesChartData = (
    articleCommentCounts: TopCommentedArticlesChartProps['articleCommentCounts'],
): {
    labels: string[];
    commentsByArticlesData: number[];
} => {
    const labels: string[] = [];
    const commentsByArticlesData: number[] = [];

    articleCommentCounts.forEach(
        ({ articleId, commentCount, articleTitle }) => {
            labels.push(articleTitle);
            commentsByArticlesData.push(commentCount);
        },
    );

    return {
        labels,
        commentsByArticlesData,
    };
};
