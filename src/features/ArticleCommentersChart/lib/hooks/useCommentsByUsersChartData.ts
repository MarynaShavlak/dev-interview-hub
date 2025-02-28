import { ArticleCommentersChartProps } from '../../model/types/types';

export const useCommentsByUsersChartData = (
    commentCountsByUser: ArticleCommentersChartProps['commentCountsByUser'],
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
