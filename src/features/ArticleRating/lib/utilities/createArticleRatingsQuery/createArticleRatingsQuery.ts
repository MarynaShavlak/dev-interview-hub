import { Query, query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { ArticleRatingType } from '../../../model/types/articleRatingType';

export const createArticleRatingsQuery = (
    articleId: string,
): Query<ArticleRatingType> => {
    const ratingsCollection = dataPoint<ArticleRatingType>('ratings');
    return query(
        ratingsCollection,
        where('articleId', '==', articleId),
        // orderBy('createdAt', 'desc'),
    );
};
