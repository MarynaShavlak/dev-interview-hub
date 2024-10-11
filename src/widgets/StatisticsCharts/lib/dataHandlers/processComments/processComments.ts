import { StatisticsData } from '../../../model/types/stats';
import { ArticleComment } from '../../../model/types/articleComment';

export const processComments = (
    data: StatisticsData,
    comments?: ArticleComment[],
) => {
    if (!comments) return;
    const { commentCountsByArticle } = data;
    const { commentCountsByUser } = data;
    const activeUsersList = data.activeUsersList.inComments;
    const activeArticlesList = data.activeArticlesList.withComments;

    comments.forEach((comment) => {
        const {
            user: { id, username },
            articleId,
        } = comment;
        activeUsersList.add(id);
        activeArticlesList.add(articleId);

        commentCountsByArticle[articleId] =
            (commentCountsByArticle[articleId] || 0) + 1;
        commentCountsByUser[username] =
            (commentCountsByUser[username] || 0) + 1;
    });

    data.articleCommentCounts = Object.keys(commentCountsByArticle)
        .map((articleId) => ({
            articleId,
            commentCount: commentCountsByArticle[articleId],
        }))
        .sort((a, b) => b.commentCount - a.commentCount);
};
