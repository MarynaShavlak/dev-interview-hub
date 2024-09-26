import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '../model/types/article';

export const articleApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticles: build.query<Article[], null>({
            query: () => ({
                url: '/articles',
                params: {
                    _expand: 'user',
                },
            }),
        }),
    }),
});

export const useArticles = articleApi.useGetArticlesQuery;
