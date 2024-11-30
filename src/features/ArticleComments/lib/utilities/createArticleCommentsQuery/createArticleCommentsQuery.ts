import { Query, query, where, orderBy } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { ArticleComment } from '../../../model/types/articleComment';

/**
 * Creates a Firestore query for fetching comments by article ID.
 * @param articleId - The ID of the article to fetch comments for.
 * @returns A Firestore Query instance configured for the article's comments.
 */
export const createArticleCommentsQuery = (
    articleId: string,
): Query<ArticleComment> => {
    const commentsCollection = dataPoint<ArticleComment>('comments');
    return query(
        commentsCollection,
        where('articleId', '==', articleId),
        orderBy('createdAt', 'desc'),
    );
};
