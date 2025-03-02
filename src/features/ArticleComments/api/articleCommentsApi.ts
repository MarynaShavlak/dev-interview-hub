import { firestoreApi } from '@/shared/api/firestoreApi';

import { fetchCollectionDocsData } from '@/shared/lib/firestore/fetchCollectionDocsData/fetchCollectionDocsData';
import { ArticleComment } from '../model/types/articleComment';
import { fetchCommentsForArticle } from '../lib/utilities/fetchCommentsForArticle/fetchCommentsForArticle';
import { ERROR_COMMENT_MESSAGES } from '../model/consts/errorCommentMessages';

import { subscribeToArticleComments } from '../lib/utilities/subscribeToArticleComments/subscribeToArticleComments';
import { subscribeToAllArticlesComments } from '../lib/utilities/subscribeToAllArticlesComments/subscribeToAllArticlesComments';
import { fetchCommentsForMultipleArticles } from '../lib/utilities/fetchCommentsForMultipleArticles/fetchCommentsForMultipleArticles';
import {
    NewCommentDraft,
    saveCommentToFirestore,
} from '../lib/utilities/saveCommentToFirestore/saveCommentToFirestore';
import { deleteCommentsFromFirestore } from '../lib/utilities/deleteCommentsFromFirestore/deleteCommentsFromFirestore';
import { handleFirestoreSubscription } from '@/shared/lib/firestore/handleFirestoreSubscription/handleFirestoreSubscription';
import { subscribeToMultipleArticlesComments } from '../lib/utilities/subscribeToMultipleArticlesComments/subscribeToMultipleArticlesComments';
import { executeQuery } from '@/shared/lib/firestore/executeQuery/executeQuery';
import { deleteDocFromFirestore } from '@/shared/lib/firestore/deleteDocFromFirestore/deleteDocFromFirestore';

export const articlesCommentsFirebaseApi = firestoreApi
    .enhanceEndpoints({ addTagTypes: ['ArticleComments'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getArticlesComments: build.query<ArticleComment[], void>({
                providesTags: ['ArticleComments'],
                keepUnusedDataFor: 3600,
                async queryFn() {
                    return executeQuery(
                        () =>
                            fetchCollectionDocsData<ArticleComment>('comments'),
                        ERROR_COMMENT_MESSAGES.COMMENTS_FETCH_FAIL,
                    );
                },
                async onCacheEntryAdded(
                    _,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToAllArticlesComments, // Subscription function
                        updateFn: updateCachedData, // Callback function to update cache
                        dependency: null, // Dependency
                        cacheDataLoaded, // Promise for cache data loading
                        cacheEntryRemoved, // Promise for cache entry removal
                    });
                },
            }),
            getCommentsByArticleId: build.query<ArticleComment[], string>({
                providesTags: [{ type: 'ArticleComments', id: 'commentId' }],
                keepUnusedDataFor: 3600,
                async queryFn(articleId: string) {
                    if (!articleId) {
                        return {
                            error: new Error(
                                ERROR_COMMENT_MESSAGES.ARTICLE_NOT_FOUND,
                            ),
                        };
                    }

                    return executeQuery(
                        () => fetchCommentsForArticle(articleId),
                        ERROR_COMMENT_MESSAGES.COMMENTS_BY_ARTICLE_ID_FETCH_FAIL(
                            articleId,
                        ),
                    );
                },
                async onCacheEntryAdded(
                    articleId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToArticleComments,
                        updateFn: updateCachedData,
                        dependency: articleId,
                        cacheDataLoaded,
                        cacheEntryRemoved,
                    });
                },
            }),
            getCommentsByArticleIdsList: build.query<
                ArticleComment[],
                string[]
            >({
                providesTags: ['ArticleComments'],
                keepUnusedDataFor: 3600,

                async queryFn(articleIds) {
                    return executeQuery(
                        () => fetchCommentsForMultipleArticles(articleIds),
                        ERROR_COMMENT_MESSAGES.COMMENTS_BY_ARTICLE_IDS_FETCH_FAIL(
                            articleIds,
                        ),
                    );
                },

                async onCacheEntryAdded(
                    articleIds,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToMultipleArticlesComments,
                        updateFn: updateCachedData,
                        dependency: articleIds,
                        cacheDataLoaded,
                        cacheEntryRemoved,
                    });
                },
            }),
            addComment: build.mutation<ArticleComment, NewCommentDraft>({
                invalidatesTags: [{ type: 'ArticleComments', id: 'commentId' }],
                async queryFn(newComment) {
                    return executeQuery(
                        () => saveCommentToFirestore(newComment),
                        ERROR_COMMENT_MESSAGES.ADD_COMMENT_FAIL,
                    );
                },
            }),
            deleteComment: build.mutation<string, string>({
                invalidatesTags: ['ArticleComments'],
                async queryFn(commentId) {
                    return executeQuery(
                        () => deleteDocFromFirestore('comments', commentId),
                        ERROR_COMMENT_MESSAGES.DELETE_ERROR,
                    );
                },
            }),
            deleteCommentsByArticleId: build.mutation<void, string>({
                invalidatesTags: ['ArticleComments'],
                async queryFn(articleId) {
                    return executeQuery(async () => {
                        const comments =
                            await fetchCommentsForArticle(articleId);
                        await deleteCommentsFromFirestore(comments);
                    }, ERROR_COMMENT_MESSAGES.DELETE_COMMENTS_BY_ARTICLE_ID_FAIL(articleId));
                },
            }),
        }),
    });

export const useArticlesComments =
    articlesCommentsFirebaseApi.useGetArticlesCommentsQuery;

export const useCommentsByArticleId =
    articlesCommentsFirebaseApi.useGetCommentsByArticleIdQuery;

export const addCommentMutation =
    articlesCommentsFirebaseApi.endpoints.addComment.initiate;

export const useCommentsByArticleIdsList =
    articlesCommentsFirebaseApi.useGetCommentsByArticleIdsListQuery;

export const deleteCommentMutation =
    articlesCommentsFirebaseApi.endpoints.deleteComment.initiate;

export const deleteCommentsByArticleId =
    articlesCommentsFirebaseApi.endpoints.deleteCommentsByArticleId.initiate;

// try {
//     const comments =
//         await fetchCollectionDocsData<ArticleComment>(
//             'comments',
//         );
//     return { data: comments };
// } catch (error) {
//     return handleRequestErrorMessage(
//         ERROR_MESSAGES.COMMENTS_FETCH_FAIL,
//         error,
//     );
// }

// try {
//     if (!articleId) {
//         const error = new Error(
//             ERROR_MESSAGES.ARTICLE_NOT_FOUND,
//         );
//         return { error };
//     }
//     const comments =
//         await fetchCommentsForArticle(articleId);
//
//     return { data: comments };
// } catch (error) {
//     return handleRequestErrorMessage(
//         ERROR_MESSAGES.COMMENTS_BY_ARTICLE_ID_FETCH_FAIL(
//             articleId,
//         ),
//         error,
//     );
// }

// try {
//     const comments =
//         await fetchCommentsForMultipleArticles(articleIds);
//     return { data: comments };
// } catch (error) {
//     return handleRequestErrorMessage(
//         ERROR_MESSAGES.COMMENTS_BY_ARTICLE_IDS_FETCH_FAIL(
//             articleIds,
//         ),
//         error,
//     );
// }

// await cacheDataLoaded;
// const unsubscribe = subscribeToArticleComments(
//     updateCachedData,
//     articleId,
// );
//
// await cacheEntryRemoved;
// unsubscribe?.();
