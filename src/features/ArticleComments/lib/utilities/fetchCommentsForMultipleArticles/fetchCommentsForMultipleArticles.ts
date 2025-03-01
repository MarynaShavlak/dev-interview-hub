import { createCommentsByArticleIdsQuery } from '../createCommentsByArticleIdsQuery/createCommentsByArticleIdsQuery';
import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { ArticleComment } from '../../..';

export const fetchCommentsForMultipleArticles = async (
    articleIds: string[],
) => {
    if (!articleIds || articleIds.length === 0) return [];
    const commentsQuery = createCommentsByArticleIdsQuery(articleIds);
    if (commentsQuery) {
        const comments = await fetchQueryResults<ArticleComment>(commentsQuery);
        return comments;
    }
    return [];
};
