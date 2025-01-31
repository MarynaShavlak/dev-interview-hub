import { getDoc, onSnapshot, query } from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/rtkApi';

import { fetchCollection } from '@/shared/lib/firestore/fetchCollection/fetchCollection';
import { ArticleComment } from '../model/types/articleComment';
import { User } from '@/entities/User';
import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { createArticleCommentsQuery } from '../lib/utilities/createArticleCommentsQuery/createArticleCommentsQuery';
import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { createCommentsByArticleIdsQuery } from '../lib/utilities/createCommentsByArticleIdsQuery/createCommentsByArticleIdsQuery';
import { deleteDocFromFirestore } from '@/shared/lib/firestore/deleteDocFromFirestore/deleteDocFromFirestore';

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
                            await fetchCollection<ArticleComment>('comments');
                        return { data: comments };
                    } catch (error) {
                        console.error('Error fetching comments:', error);
                        return { error };
                    }
                },
                async onCacheEntryAdded(
                    _,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;
                    let unsubscribe;
                    try {
                        const collectionRef =
                            dataPoint<ArticleComment>('comments');
                        const queryRef = query(collectionRef);
                        unsubscribe = onSnapshot(queryRef, (snapshot) => {
                            updateCachedData((draft) => {
                                const result = snapshot?.docs?.map((doc) =>
                                    doc.data(),
                                ) as ArticleComment[];
                            });
                        });
                    } catch (error) {
                        console.error('Error in comments!', error);
                    }

                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
                },
            }),
            getCommentsByArticleId: build.query<ArticleComment[], string>({
                providesTags: [{ type: 'ArticleComments', id: 'commentId' }],
                keepUnusedDataFor: 3600,
                async queryFn(articleId) {
                    try {
                        const commentsQuery =
                            createArticleCommentsQuery(articleId);

                        const comments =
                            await fetchQueryResults<ArticleComment>(
                                commentsQuery,
                            );

                        return { data: comments };
                    } catch (error) {
                        console.error(
                            'Error fetching comments by article ID:',
                            error,
                        );
                        return {
                            error: 'Error fetching comments by article ID',
                        };
                    }
                },
                async onCacheEntryAdded(
                    articleId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;
                    let unsubscribe;
                    try {
                        const commentsQuery =
                            createArticleCommentsQuery(articleId);

                        unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
                            updateCachedData((draft) => {
                                const result = snapshot?.docs?.map((doc) =>
                                    doc.data(),
                                ) as ArticleComment[];
                            });
                        });
                    } catch (error) {
                        console.error('Error in comments snapshot:', error);
                    }

                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
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
