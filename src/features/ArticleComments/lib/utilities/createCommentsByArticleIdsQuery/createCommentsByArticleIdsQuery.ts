import { Query, query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';

import { ArticleComment } from '../../../model/types/articleComment';

export const createCommentsByArticleIdsQuery = (
    articleIds: string[],
): Query<ArticleComment> => {
    if (!articleIds || articleIds.length === 0) {
        throw new Error('Article IDs array must not be empty');
    }

    const commentsCollection = dataPoint<ArticleComment>('comments');

    return query(commentsCollection, where('articleId', 'in', articleIds));
};
