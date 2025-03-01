import { createArticleRatingQuery } from '../createArticleRatingQuery/createArticleRatingQuery';
import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { ArticleRatingType } from '../../../model/types/articleRatingType';

interface FetchArticleRateByUserParams {
    articleId: string;
    userId: string;
}

export const fetchArticleRateByUser = async ({
    articleId,
    userId,
}: FetchArticleRateByUserParams): Promise<ArticleRatingType[]> => {
    const ratingQuery = createArticleRatingQuery(articleId, userId);

    const ratings = await fetchQueryResults<ArticleRatingType>(ratingQuery);
    return ratings;
};
