import { ArticleCommentatorsDistributionChartProps } from '../../model/types/types';

export const useCommentsByUsersChartData = (
    commentCountsByUser: ArticleCommentatorsDistributionChartProps['commentCountsByUser'],
): {
    commentsByUsersData: { x: string; y: number }[];
} => {
    const commentsByUsersData = Object.entries(commentCountsByUser)
        .map(([username, commentCount]) => ({ x: username, y: commentCount }))
        .sort((a, b) => b.y - a.y);

    return {
        commentsByUsersData,
    };
};
