import { useMemo } from 'react';
import { useArticlesComments } from '../../../api/articlesCommentsApi';
import { ArticleComment } from '../../../model/types/articleComment';
import { Data } from '../../../model/types/charts';

const countComments = (comments: ArticleComment[]) => {
    console.log('comments:', comments);
    const articleCommentCount: Data = {};
    const userCommentCount: Data = {};

    comments.forEach(({ articleId, user }) => {
        articleCommentCount[articleId] =
            (articleCommentCount[articleId] || 0) + 1;
        userCommentCount[user.username] =
            (userCommentCount[user.username] || 0) + 1;
    });

    const transformData = (countObject: Data) =>
        Object.entries(countObject)
            .map(([id, count]) => ({ id, count }))
            .sort((a, b) => b.count - a.count);

    return {
        commentsByArticlesData: transformData(articleCommentCount),
        commentsByUsersData: transformData(userCommentCount).map(
            ({ id, count }) => ({ x: id, y: count }),
        ),
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

    return {
        isLoading,
        articleCommentsLabels,
        articleCommentsData,
        commentsByUsersData,
    };
};
