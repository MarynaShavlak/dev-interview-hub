import { Query, query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';

import { ArticleRatingData } from '../../../model/types/articleRatingData';

export const createRatingsByArticleIdsQuery = (
    articleIds: string[],
): Query<ArticleRatingData> | null => {
    if (!articleIds || articleIds.length === 0) {
        return null;
    }

    const ratingsCollection = dataPoint<ArticleRatingData>('ratings');

    return query(ratingsCollection, where('articleId', 'in', articleIds));
};
