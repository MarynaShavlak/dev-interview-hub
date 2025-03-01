import { Query, query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';

import { ArticleRatingType } from '../../../model/types/articleRatingType';

export const createRatingsByArticleIdsQuery = (
    articleIds: string[],
): Query<ArticleRatingType> | null => {
    if (!articleIds || articleIds.length === 0) {
        return null;
    }

    const ratingsCollection = dataPoint<ArticleRatingType>('ratings');

    return query(ratingsCollection, where('articleId', 'in', articleIds));
};
