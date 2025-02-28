import { getDoc, onSnapshot } from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/firestoreApi';

import { fetchCollectionDocsData } from '@/shared/lib/firestore/fetchCollectionDocsData/fetchCollectionDocsData';
import { ArticleComment } from '../model/types/articleComment';
import { User } from '@/entities/User';
import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { createArticleCommentsQuery } from '../lib/utilities/createArticleCommentsQuery/createArticleCommentsQuery';
import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { createCommentsByArticleIdsQuery } from '../lib/utilities/createCommentsByArticleIdsQuery/createCommentsByArticleIdsQuery';
import { deleteDocFromFirestore } from '@/shared/lib/firestore/deleteDocFromFirestore/deleteDocFromFirestore';
import { fetchCommentsForArticle } from '../lib/utilities/fetchCommentsForArticle/fetchCommentsForArticle';
import { ERROR_MESSAGES } from '../model/consts/errorMessages';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';

import { subscribeToArticleComments } from '../lib/utilities/subscribeToArticleComments/subscribeToArticleComments';
import { subscribeToAllArticlesComments } from '../lib/utilities/subscribeToAllArticlesComments/subscribeToAllArticlesComments';

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
                    await cacheDataLoaded;
                    const unsubscribe =
                        subscribeToAllArticlesComments(updateCachedData);

                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
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
                    await cacheDataLoaded;
                    const unsubscribe = subscribeToArticleComments(
                        updateCachedData,
                        articleId,
                    );

                    await cacheEntryRemoved;
                    if (unsubscribe) unsubscribe();
                },
            }),
            getCommentsByArticleIdsList: build.query<
                ArticleComment[],
                string[]
            >({
                providesTags: ['ArticleComments'],
                keepUnusedDataFor: 3600,
                async queryFn(articleIds) {
                    try {
                        const commentsQuery =
                            createCommentsByArticleIdsQuery(articleIds);
                        if (commentsQuery) {
                            const comments =
                                await fetchQueryResults<ArticleComment>(
                                    commentsQuery,
                                );
                            return { data: comments };
                        }
                        return { data: [] };
                    } catch (error) {
                        console.error(
                            'Error fetching comments by article IDs:',
                            error,
                        );
                        return {
                            error: 'Error fetching comments by article IDs',
                        };
                    }
                },
                async onCacheEntryAdded(
                    articleIds,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;
                    let unsubscribe;
                    try {
                        const commentsQuery =
                            createCommentsByArticleIdsQuery(articleIds);
                        if (commentsQuery) {
                            unsubscribe = onSnapshot(
                                commentsQuery,
                                (snapshot) => {
                                    updateCachedData((draft) => {
                                        const result = snapshot?.docs?.map(
                                            (doc) => doc.data(),
                                        ) as ArticleComment[];
                                    });
                                },
                            );
                        }
                    } catch (error) {
                        console.error('Error in comments snapshot:', error);
                    }

                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
                },
            }),
            addComment: build.mutation<
                ArticleComment,
                { articleId: string; user: User; text: string; id: string }
            >({
                invalidatesTags: [{ type: 'ArticleComments', id: 'commentId' }],
                async queryFn(newComment) {
                    try {
                        const docRef = await addDocToFirestore<ArticleComment>(
                            'comments',
                            {
                                ...newComment,
                                createdAt: new Date().toISOString(),
                            },
                        );

                        const createdDocSnapshot = await getDoc(docRef);

                        if (!createdDocSnapshot.exists()) {
                            throw new Error(
                                'Failed to retrieve created comment.',
                            );
                        }

                        return {
                            data: {
                                ...createdDocSnapshot.data(),
                            } as ArticleComment,
                        };
                    } catch (error) {
                        console.error('Error adding new comment:', error);
                        return { error };
                    }
                },
            }),
            deleteCommentsByArticleId: build.mutation<void, string>({
                invalidatesTags: ['ArticleComments'],
                async queryFn(articleId) {
                    try {
                        const commentsQuery =
                            createArticleCommentsQuery(articleId);
                        const comments =
                            await fetchQueryResults<ArticleComment>(
                                commentsQuery,
                            );

                        const deletePromises = comments.map((comment) =>
                            deleteDocFromFirestore('comments', comment.id),
                        );

                        await Promise.allSettled(deletePromises);

                        return { data: undefined };
                    } catch (error) {
                        console.error(
                            'Error deleting comments by article ID:',
                            error,
                        );
                        return {
                            error: 'Error deleting comments by article ID',
                        };
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
