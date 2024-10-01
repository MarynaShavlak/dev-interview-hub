import { useMemo } from 'react';
import { useArticlesComments } from '../../../api/articlesCommentsApi';
import { ArticleComment } from '../../../model/types/articleComment';
import { Data } from '../../../model/types/charts';

const countComments = (comments: ArticleComment[]) => {
    const articleCommentCount: Data = {};
    const userCommentCount: Data = {};

    comments.forEach(({ articleId, userId }) => {
        articleCommentCount[articleId] =
            (articleCommentCount[articleId] || 0) + 1;
        userCommentCount[userId] = (userCommentCount[userId] || 0) + 1;
    });

    const transformData = (countObject: Data) =>
        Object.entries(countObject)
            .map(([id, count]) => ({ id, count }))
            .sort((a, b) => b.count - a.count);

    return {
        commentsByArticlesData: transformData(articleCommentCount),
        commentsByUsersData: transformData(userCommentCount),
    };
};

export const useArticleCommentsChartData = () => {
    const { data: comments = [], isLoading } = useArticlesComments(null);

    const { commentsByArticlesData, commentsByUsersData } = useMemo(
        () => countComments(comments),
        [comments],
    );

    const articleCommentsLabels = commentsByArticlesData.map((item) => item.id);
    const articleCommentsData = commentsByArticlesData.map(
        (item) => item.count,
    );
    const userCommentsLabels = commentsByUsersData.map((item) => item.id);
    const userCommentsData = commentsByUsersData.map((item) => item.count);

    return {
        isLoading,
        articleCommentsLabels,
        articleCommentsData,
        userCommentsLabels,
        userCommentsData,
    };
};
