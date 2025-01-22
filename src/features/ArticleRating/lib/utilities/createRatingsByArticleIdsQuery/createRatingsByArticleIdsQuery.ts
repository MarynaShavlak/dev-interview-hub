import { Query, query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';

import { ArticleRatingData } from '../../../model/types/articleRatingData';

export const createRatingsByArticleIdsQuery = (
    articleIds: string[],
): Query<ArticleRatingData> => {
    if (!articleIds || articleIds.length === 0) {
        throw new Error('Article IDs array must not be empty');
    }

    const ratingsCollection = dataPoint<ArticleRatingData>('ratings');

    return query(ratingsCollection, where('articleId', 'in', articleIds));
};
