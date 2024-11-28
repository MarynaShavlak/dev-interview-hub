import { rtkApi } from '@/shared/api/rtkApi';
import { Comment } from '@/entities/Comment';

export interface ArticleComment extends Comment {
    articleId: string;
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
