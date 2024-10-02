import { rtkApi } from '@/shared/api/rtkApi';
import { ArticleComment } from '../model/types/articleComment';

export const articlesCommentsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesComments: build.query<ArticleComment[], null>({
            query: () => ({
                url: '/comments',
                params: {
                    _expand: ['user'],
                },
            }),
        }),
    }),
});

export const useArticlesComments =
    articlesCommentsApi.useGetArticlesCommentsQuery;
