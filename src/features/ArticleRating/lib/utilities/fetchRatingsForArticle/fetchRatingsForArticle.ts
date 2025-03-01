import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { ArticleRatingType } from '../../../model/types/articleRatingType';
import { createArticleRatingsQuery } from '../createArticleRatingsQuery/createArticleRatingsQuery';

export const fetchRatingsForArticle = async (articleId: string) => {
    const ratingsQuery = createArticleRatingsQuery(articleId);

    const ratings = await fetchQueryResults<ArticleRatingType>(ratingsQuery);
    return ratings;
};
