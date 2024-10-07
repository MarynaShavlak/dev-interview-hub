import { rtkApi } from '@/shared/api/rtkApi';

import { User } from '@/entities/User';

export interface ArticleComment extends Comment {
    articleId: string;
    user: User;
}

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
