import { Query, query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';

import { ArticleComment } from '../../../model/types/articleComment';

export const createCommentsByArticleIdsQuery = (
    articleIds: string[],
): Query<ArticleComment> | null => {
    if (!articleIds || articleIds.length === 0) {
        return null;
    }

    const commentsCollection = dataPoint<ArticleComment>('comments');

    return query(commentsCollection, where('articleId', 'in', articleIds));
};
