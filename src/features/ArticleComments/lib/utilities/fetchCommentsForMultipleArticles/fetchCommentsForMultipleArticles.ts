import { query } from 'firebase/firestore';
import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { ArticleComment } from '../../..';
import { dataPoint } from '@/shared/lib/firestore/firestore';

export const fetchCommentsForMultipleArticles = async (
    articleIds: string[],
) => {
    if (!articleIds || articleIds.length === 0) return [];
    // const commentsQuery = createCommentsByArticleIdsQuery(articleIds);
    const commentsCollection = dataPoint<ArticleComment>('comments');

    const commentsQuery = query(commentsCollection);
    if (commentsQuery) {
        const comments = await fetchQueryResults<ArticleComment>(commentsQuery);
        return comments;
    }
    return [];
};
