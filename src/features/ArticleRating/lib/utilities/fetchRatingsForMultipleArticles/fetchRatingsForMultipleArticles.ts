import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { ArticleRatingType } from '../../../model/types/articleRatingType';
import { createRatingsByArticleIdsQuery } from '../createRatingsByArticleIdsQuery/createRatingsByArticleIdsQuery';

export const fetchRatingsForMultipleArticles = async (articleIds: string[]) => {
    if (!articleIds || articleIds.length === 0) return [];
    const ratingsQuery = createRatingsByArticleIdsQuery(articleIds);
    if (ratingsQuery) {
        const ratings =
            await fetchQueryResults<ArticleRatingType>(ratingsQuery);
        return ratings;
    }
    return [];
};
