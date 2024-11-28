import { firestoreApi } from '@/shared/api/rtkApi';

import { fetchCollection } from '@/shared/lib/firestore/fetchCollection/fetchCollection';
import { ArticleComment } from '../model/types/articleComment';
import { getAllDocRefsByField } from '@/shared/lib/firestore/getAllDocRefsByField/getAllDocRefsByField';
import { fetchAllDocumentsByRefs } from '@/shared/lib/firestore/fetchAllDocumentsByRefs/fetchAllDocumentsByRefs';

export const articlesCommentsFirebaseApi = firestoreApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesComments: build.query<ArticleComment[], void>({
            async queryFn() {
                try {
                    const comments =
                        await fetchCollection<ArticleComment>('comments');
                    return { data: comments };
                } catch (error) {
                    console.error('Error fetching comments:', error);
                    return { error };
                }
            },
        }),
        getCommentsByArticleId: build.query<ArticleComment[], string>({
            async queryFn(articleId) {
                try {
                    const commentsByArticleRefs =
                        await getAllDocRefsByField<ArticleComment>(
                            'comments',
                            'articleId',
                            articleId,
                        );

                    const comments =
                        await fetchAllDocumentsByRefs<ArticleComment>(
                            commentsByArticleRefs,
                        );
                    return { data: comments };
                } catch (error) {
                    return { error };
                }
            },
        }),
    }),
});

export const useArticlesComments =
    articlesCommentsFirebaseApi.useGetArticlesCommentsQuery;

export const getCommentsByArticleIdQuery =
    articlesCommentsFirebaseApi.endpoints.getCommentsByArticleId.initiate;
const useCommentsByArticleId =
    articlesCommentsFirebaseApi.useGetCommentsByArticleIdQuery;
