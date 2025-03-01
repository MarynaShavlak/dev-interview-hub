import { getDoc, onSnapshot } from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/firestoreApi';
import { ArticleRatingType } from '../model/types/articleRatingType';
import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { User } from '@/entities/User';
import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { fetchCollectionDocsData } from '@/shared/lib/firestore/fetchCollectionDocsData/fetchCollectionDocsData';
import { createRatingsByArticleIdsQuery } from '../lib/utilities/createRatingsByArticleIdsQuery/createRatingsByArticleIdsQuery';
import { deleteDocFromFirestore } from '@/shared/lib/firestore/deleteDocFromFirestore/deleteDocFromFirestore';
import { executeQuery } from '@/shared/lib/firestore/executeQuery/executeQuery';
import { ERROR_RATING_MESSAGES } from '../model/consts/errorRatingMessages';

import { fetchArticleRateByUser } from '../lib/utilities/fetchArticleRateByUser/fetchArticleRateByUser';
import { handleFirestoreSubscription } from '@/shared/lib/firestore/handleFirestoreSubscription/handleFirestoreSubscription';

import { subscribeToArticleRating } from '../lib/utilities/subscribeToArticleRating/subscribeToArticleRating';

interface GetArticleRatingArg {
    userId: string;
    articleId: string;
}

interface RateArticleArg {
    user: User;
    articleId: string;
    rate: number;
    feedback: string | null;
    id: string;
}

export const articleRatingFirebaseApi = firestoreApi
    .enhanceEndpoints({ addTagTypes: ['ArticleRating'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getArticlesRatings: build.query<ArticleRatingType[], void>({
                async queryFn() {
                    return executeQuery(
                        () =>
                            fetchCollectionDocsData<ArticleRatingType>(
                                'ratings',
                            ),
                        ERROR_RATING_MESSAGES.FETCH_RATINGS_FAIL,
                    );
                },
            }),
            getArticleRatingByUserId: build.query<
                ArticleRatingType[],
                GetArticleRatingArg
            >({
                providesTags: [{ type: 'ArticleRating', id: 'ratingId' }],
                keepUnusedDataFor: 3600,
                async queryFn({ articleId, userId }) {
                    return executeQuery(
                        () => fetchArticleRateByUser({ articleId, userId }),
                        ERROR_RATING_MESSAGES.FETCH_RATING_BY_USER_FAIL(
                            userId,
                            articleId,
                        ),
                    );
                },
                async onCacheEntryAdded(
                    { articleId, userId },
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToArticleRating,
                        updateFn: updateCachedData,
                        dependency: { articleId, userId },
                        cacheDataLoaded,
                        cacheEntryRemoved,
                    });
                },
            }),
            getRatingsByArticleIdsList: build.query<
                ArticleRatingType[],
                string[]
            >({
                providesTags: ['ArticleRating'],
                keepUnusedDataFor: 3600,
                async queryFn(articleIds) {
                    try {
                        const ratingsQuery =
                            createRatingsByArticleIdsQuery(articleIds);
                        if (ratingsQuery) {
                            const ratings =
                                await fetchQueryResults<ArticleRatingType>(
                                    ratingsQuery,
                                );
                            return { data: ratings };
                        }
                        return { data: [] };
                    } catch (error) {
                        console.error(
                            'Error fetching ratings by article IDs:',
                            error,
                        );
                        return {
                            error: 'Error fetching ratings by article IDs',
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
                        const ratingsQuery =
                            createRatingsByArticleIdsQuery(articleIds);
                        if (ratingsQuery) {
                            unsubscribe = onSnapshot(
                                ratingsQuery,
                                (snapshot) => {
                                    updateCachedData((draft) => {
                                        const result = snapshot?.docs?.map(
                                            (doc) => doc.data(),
                                        ) as ArticleRatingType[];
                                    });
                                },
                            );
                        }
                    } catch (error) {
                        console.error('Error in ratings snapshot:', error);
                    }

                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
                },
            }),
            rateArticle: build.mutation<ArticleRatingType, RateArticleArg>({
                invalidatesTags: [{ type: 'ArticleRating', id: 'ratingId' }],
                async queryFn(newRating) {
                    try {
                        const docRef =
                            await addDocToFirestore<ArticleRatingType>(
                                'ratings',
                                {
                                    ...newRating,
                                    createdAt: new Date().toISOString(),
                                },
                            );

                        const createdDocSnapshot = await getDoc(docRef);

                        if (!createdDocSnapshot.exists()) {
                            throw new Error(
                                'Failed to retrieve created rating.',
                            );
                        }

                        return {
                            data: {
                                ...createdDocSnapshot.data(),
                            } as ArticleRatingType,
                        };
                    } catch (error) {
                        console.error('Error adding new rating:', error);
                        return { error };
                    }
                },
            }),
            deleteRatingsByArticleId: build.mutation<void, string>({
                invalidatesTags: ['ArticleRating'],
                async queryFn(articleId) {
                    try {
                        const ratingsQuery = createRatingsByArticleIdsQuery([
                            articleId,
                        ]);
                        if (ratingsQuery) {
                            const ratings =
                                await fetchQueryResults<ArticleRatingType>(
                                    ratingsQuery,
                                );

                            const deletePromises = ratings.map((rating) =>
                                deleteDocFromFirestore('ratings', rating.id),
                            );

                            await Promise.allSettled(deletePromises);

                            return { data: undefined };
                        }
                        return { data: undefined };
                    } catch (error) {
                        console.error(
                            'Error deleting ratings by article ID:',
                            error,
                        );
                        return {
                            error: 'Error deleting ratings by article ID',
                        };
                    }
                },
            }),
        }),
    });

export const useArticlesRatings =
    articleRatingFirebaseApi.useGetArticlesRatingsQuery;

export const useGetArticleRatingByUserId =
    articleRatingFirebaseApi.useGetArticleRatingByUserIdQuery;
export const useAddArticleRating =
    articleRatingFirebaseApi.useRateArticleMutation;

export const useRatingsByArticleIdsList =
    articleRatingFirebaseApi.useGetRatingsByArticleIdsListQuery;

export const deleteRatingsByArticleId =
    articleRatingFirebaseApi.endpoints.deleteRatingsByArticleId.initiate;
