import { rtkApi } from '@/shared/api/rtkApi';
import { ArticleRating } from '../model/types/articleRating';

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
