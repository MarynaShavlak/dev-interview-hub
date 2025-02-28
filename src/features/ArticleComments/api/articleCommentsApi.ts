import { firestoreApi } from '@/shared/api/firestoreApi';

import { fetchCollectionDocsData } from '@/shared/lib/firestore/fetchCollectionDocsData/fetchCollectionDocsData';
import { ArticleComment } from '../model/types/articleComment';
import { fetchCommentsForArticle } from '../lib/utilities/fetchCommentsForArticle/fetchCommentsForArticle';
import { ERROR_MESSAGES } from '../model/consts/errorMessages';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';

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

export const articlesCommentsFirebaseApi = firestoreApi
    .enhanceEndpoints({ addTagTypes: ['ArticleComments'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getArticlesComments: build.query<ArticleComment[], void>({
                providesTags: ['ArticleComments'],
                keepUnusedDataFor: 3600,
                async queryFn() {
                    try {
                        const comments =
                            await fetchCollectionDocsData<ArticleComment>(
                                'comments',
                            );
                        return { data: comments };
                    } catch (error) {
                        return handleRequestErrorMessage(
                            ERROR_MESSAGES.COMMENTS_FETCH_FAIL,
                            error,
                        );
                    }
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
                    try {
                        if (!articleId) {
                            const error = new Error(
                                ERROR_MESSAGES.ARTICLE_NOT_FOUND,
                            );
                            return { error };
                        }
                        const comments =
                            await fetchCommentsForArticle(articleId);

                        return { data: comments };
                    } catch (error) {
                        return handleRequestErrorMessage(
                            ERROR_MESSAGES.COMMENTS_BY_ARTICLE_ID_FETCH_FAIL(
                                articleId,
                            ),
                            error,
                        );
                    }
                },
                async onCacheEntryAdded(
                    articleId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToArticleComments, // Subscription function
                        updateFn: updateCachedData, // Callback function to update cache
                        dependency: articleId, // Dependency (articleId)
                        cacheDataLoaded, // Promise for cache data loading
                        cacheEntryRemoved, // Promise for cache entry removal
                    });
                    // await cacheDataLoaded;
                    // const unsubscribe = subscribeToArticleComments(
                    //     updateCachedData,
                    //     articleId,
                    // );
                    //
                    // await cacheEntryRemoved;
                    // unsubscribe?.();
                },
            }),
            getCommentsByArticleIdsList: build.query<
                ArticleComment[],
                string[]
            >({
                providesTags: ['ArticleComments'],
                keepUnusedDataFor: 3600,

                async onQueryStarted(articleIds, { dispatch, queryFulfilled }) {
                    try {
                        // If articleIds is empty, you may want to skip the request
                        if (!articleIds || articleIds.length === 0) {
                            // Optionally dispatch an action or return early if no valid ids
                            return { data: [] };
                        }

                        // Handle the query result when the request is successful
                        const { data } = await queryFulfilled;
                        // Optionally update state or do something else with the fetched data
                    } catch (error) {
                        // Handle the error here if needed, like dispatching additional actions
                        console.error(`Error fetching comments: ${error}`);
                    }
                },
                async queryFn(articleIds) {
                    try {
                        if (!articleIds || articleIds.length === 0)
                            return { data: [] };
                        const comments =
                            await fetchCommentsForMultipleArticles(articleIds);
                        return { data: comments };
                    } catch (error) {
                        return handleRequestErrorMessage(
                            ERROR_MESSAGES.COMMENTS_BY_ARTICLE_IDS_FETCH_FAIL(
                                articleIds,
                            ),
                            error,
                        );
                    }
                },

                async onCacheEntryAdded(
                    articleIds,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToMultipleArticlesComments, // Subscription function
                        updateFn: updateCachedData, // Callback function to update cache
                        dependency: articleIds, // Dependency
                        cacheDataLoaded, // Promise for cache data loading
                        cacheEntryRemoved, // Promise for cache entry removal
                    });
                },
            }),
            addComment: build.mutation<ArticleComment, NewCommentDraft>({
                invalidatesTags: [{ type: 'ArticleComments', id: 'commentId' }],
                async queryFn(newComment) {
                    try {
                        const createdComment =
                            await saveCommentToFirestore(newComment);
                        return { data: createdComment };
                    } catch (error) {
                        return handleRequestErrorMessage(
                            ERROR_MESSAGES.ADD_COMMENT_FAIL,
                        );
                    }
                },
            }),
            deleteCommentsByArticleId: build.mutation<void, string>({
                invalidatesTags: ['ArticleComments'],
                async queryFn(articleId) {
                    try {
                        const comments =
                            await fetchCommentsForArticle(articleId);
                        await deleteCommentsFromFirestore(comments);
                        return { data: undefined };
                    } catch (error) {
                        return handleRequestErrorMessage(
                            ERROR_MESSAGES.DELETE_COMMENTS_BY_ARTICLE_ID_FAIL(
                                articleId,
                            ),
                        );
                    }
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

export const deleteCommentsByArticleId =
    articlesCommentsFirebaseApi.endpoints.deleteCommentsByArticleId.initiate;
