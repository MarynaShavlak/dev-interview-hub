// export const processComments = (
//     data: StatisticsData,
//     comments?: ArticleComment[],
// ) => {
//     if (!comments) return;
//     const { commentCountsByArticle } = data;
//     const { commentCountsByUser } = data;
//     const activeUsersList = data.activeUsersList.inComments;
//     const activeArticlesList = data.activeArticlesList.withComments;
//
//     comments.forEach((comment) => {
//         const {
//             user: { id, username },
//             articleId,
//         } = comment;
//         activeUsersList.add(id);
//         activeArticlesList.add(articleId);
//
//         commentCountsByArticle[articleId] =
//             (commentCountsByArticle[articleId] || 0) + 1;
//         commentCountsByUser[username] =
//             (commentCountsByUser[username] || 0) + 1;
//     });
//
//     data.articleCommentCounts = Object.keys(commentCountsByArticle)
//         .map((articleId) => ({
//             articleId,
//             commentCount: commentCountsByArticle[articleId],
//         }))
//         .sort((a, b) => b.commentCount - a.commentCount);
// };

import { StatisticsData } from '../../../model/types/stats';
import { ArticleComment } from '../../../model/types/articleComment';

export const processComments = (
    data: StatisticsData,
    comments?: ArticleComment[],
) => {
    if (!comments) return;

    const { commentCountsByUser } = data;
    const activeUsersList = data.activeUsersList.inComments;
    const activeArticlesList = data.activeArticlesList.withComments; // Still using Set<string>

    // Object to store comment counts separately
    const commentCountsByArticle: { [articleId: string]: number } = {};

    comments.forEach((comment) => {
        const {
            user: { id, username },
            articleId,
        } = comment;

        activeUsersList.add(id);
        activeArticlesList.add(articleId); // Track which articles have comments

        // Update comment count for each article in the separate object
        commentCountsByArticle[articleId] =
            (commentCountsByArticle[articleId] || 0) + 1;

        // Update comment counts by user
        commentCountsByUser[username] =
            (commentCountsByUser[username] || 0) + 1;
    });

    // Generate the sorted articleCommentCounts array
    data.articleCommentCounts = Object.keys(commentCountsByArticle)
        .map((articleId) => ({
            articleId,
            commentCount: commentCountsByArticle[articleId], // Access the comment count from the separate object
        }))
        .sort((a, b) => b.commentCount - a.commentCount);
};
