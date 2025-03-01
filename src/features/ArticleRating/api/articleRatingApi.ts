import { getDoc } from 'firebase/firestore';
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

import { fetchRatingsForMultipleArticles } from '../lib/utilities/fetchRatingsForMultipleArticles/fetchRatingsForMultipleArticles';
import { subscribeToMultipleArticlesRatings } from '../lib/utilities/subscribeToMultipleArticlesRatings/subscribeToMultipleArticlesRatings';

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
                    return executeQuery(
                        () => fetchRatingsForMultipleArticles(articleIds),
                        ERROR_RATING_MESSAGES.FETCH_RATINGS_BY_ARTICLE_IDS_FAIL(
                            articleIds,
                        ),
                    );
                },
                async onCacheEntryAdded(
                    articleIds,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToMultipleArticlesRatings,
                        updateFn: updateCachedData,
                        dependency: articleIds,
                        cacheDataLoaded,
                        cacheEntryRemoved,
                    });
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
