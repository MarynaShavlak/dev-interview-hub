import { Query, query } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';

import { ArticleComment } from '../../../model/types/articleComment';

export const createCommentsByArticleIdsQuery = (
    articleIds: string[],
): Query<ArticleComment> | null => {
    if (!articleIds || articleIds.length === 0) {
        return null;
    }
    console.log('l', articleIds.length);

    const commentsCollection = dataPoint<ArticleComment>('comments');
    return query(commentsCollection);
    // return query(commentsCollection, where('articleId', 'in', articleIds));
};
