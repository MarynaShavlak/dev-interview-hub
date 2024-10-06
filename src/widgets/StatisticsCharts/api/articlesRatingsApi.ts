import { rtkApi } from '@/shared/api/rtkApi';

import { RatingType } from '@/entities/Rating';

export interface ArticleRating extends RatingType {
    articleId: string;
    userId: string;
}

export const articlesRatingsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesRatings: build.query<ArticleRating[], null>({
            query: () => ({
                url: '/article-ratings',
            }),
        }),
    }),
});

export const useArticlesRatings = articlesRatingsApi.useGetArticlesRatingsQuery;
