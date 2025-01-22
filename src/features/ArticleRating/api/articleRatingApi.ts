import { getDoc, onSnapshot } from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/rtkApi';
import { ArticleRatingData } from '../model/types/articleRatingData';
import { createArticleRatingQuery } from '../lib/utilities/createArticleRatingQuery/createArticleRatingQuery';
import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { User } from '@/entities/User';
import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { fetchCollection } from '@/shared/lib/firestore/fetchCollection/fetchCollection';
import { createRatingsByArticleIdsQuery } from '../lib/utilities/createRatingsByArticleIdsQuery/createRatingsByArticleIdsQuery';

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
            getArticlesRatings: build.query<ArticleRatingData[], void>({
                async queryFn() {
                    try {
                        const ratings =
                            await fetchCollection<ArticleRatingData>('ratings');
                        return { data: ratings };
                    } catch (error) {
                        console.error('Error fetching ratings:', error);
                        return { error };
                    }
                },
            }),
            getArticleRatingByUserId: build.query<
                ArticleRatingData[],
                GetArticleRatingArg
            >({
                providesTags: [{ type: 'ArticleRating', id: 'ratingId' }],
                keepUnusedDataFor: 3600,
                async queryFn({ articleId, userId }) {
                    try {
                        const ratingQuery = createArticleRatingQuery(
                            articleId,
                            userId,
                        );

                        const ratings =
                            await fetchQueryResults<ArticleRatingData>(
                                ratingQuery,
                            );

                        return { data: ratings };
                    } catch (error) {
                        console.error(
                            'Error fetching rating for article by user ID:',
                            error,
                        );
                        return {
                            error: 'Error fetching rating for article by user ID',
                        };
                    }
                },
                async onCacheEntryAdded(
                    { articleId, userId },
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;
                    let unsubscribe;
                    try {
                        const ratingQuery = createArticleRatingQuery(
                            articleId,
                            userId,
                        );

                        unsubscribe = onSnapshot(ratingQuery, (snapshot) => {
                            updateCachedData((draft) => {
                                const result = snapshot?.docs?.map((doc) =>
                                    doc.data(),
                                ) as ArticleRatingData[];
                            });
                        });
                    } catch (error) {
                        console.error(
                            'Error fetching rating for article by user ID:',
                            error,
                        );
                    }

                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
                },
            }),
            getRatingsByArticleIdsList: build.query<
                ArticleRatingData[],
                string[]
            >({
                providesTags: ['ArticleRating'],
                keepUnusedDataFor: 3600,
                async queryFn(articleIds) {
                    try {
                        const ratingsQuery =
                            createRatingsByArticleIdsQuery(articleIds);
                        const ratings =
                            await fetchQueryResults<ArticleRatingData>(
                                ratingsQuery,
                            );
                        return { data: ratings };
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

                        unsubscribe = onSnapshot(ratingsQuery, (snapshot) => {
                            updateCachedData((draft) => {
                                const result = snapshot?.docs?.map((doc) =>
                                    doc.data(),
                                ) as ArticleRatingData[];
                            });
                        });
                    } catch (error) {
                        console.error('Error in ratings snapshot:', error);
                    }

                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
                },
            }),
            rateArticle: build.mutation<ArticleRatingData, RateArticleArg>({
                invalidatesTags: [{ type: 'ArticleRating', id: 'ratingId' }],
                async queryFn(newRating) {
                    try {
                        const docRef =
                            await addDocToFirestore<ArticleRatingData>(
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
                            } as ArticleRatingData,
                        };
                    } catch (error) {
                        console.error('Error adding new rating:', error);
                        return { error };
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
