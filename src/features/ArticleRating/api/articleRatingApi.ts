import { firestoreApi } from '@/shared/api/firestoreApi';
import { ArticleRatingType } from '../model/types/articleRatingType';
import { User } from '@/entities/User';
import { fetchCollectionDocsData } from '@/shared/lib/firestore/fetchCollectionDocsData/fetchCollectionDocsData';
import { executeQuery } from '@/shared/lib/firestore/executeQuery/executeQuery';
import { ERROR_RATING_MESSAGES } from '../model/consts/errorRatingMessages';

import { fetchArticleRateByUser } from '../lib/utilities/fetchArticleRateByUser/fetchArticleRateByUser';
import { handleFirestoreSubscription } from '@/shared/lib/firestore/handleFirestoreSubscription/handleFirestoreSubscription';

import { subscribeToArticleRating } from '../lib/utilities/subscribeToArticleRating/subscribeToArticleRating';

import { fetchRatingsForMultipleArticles } from '../lib/utilities/fetchRatingsForMultipleArticles/fetchRatingsForMultipleArticles';
import { subscribeToMultipleArticlesRatings } from '../lib/utilities/subscribeToMultipleArticlesRatings/subscribeToMultipleArticlesRatings';

import { saveRatingToFirestore } from '../lib/utilities/saveRatingToFirestore/saveRatingToFirestore';
import { fetchRatingsForArticle } from '../lib/utilities/fetchRatingsForArticle/fetchRatingsForArticle';
import { deleteRatingsFromFirestore } from '../lib/utilities/deleteRatingsFromFirestore/deleteRatingsFromFirestore';

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
                    return executeQuery(
                        () => saveRatingToFirestore(newRating),
                        ERROR_RATING_MESSAGES.ADD_RATING_FAIL,
                    );
                },
            }),
            deleteRatingsByArticleId: build.mutation<void, string>({
                invalidatesTags: ['ArticleRating'],
                async queryFn(articleId) {
                    return executeQuery(async () => {
                        const comments =
                            await fetchRatingsForArticle(articleId);
                        await deleteRatingsFromFirestore(comments);
                    }, ERROR_RATING_MESSAGES.DELETE_RATINGS_BY_ARTICLE_ID_FAIL(articleId));
                },
            }),
        }),
    });

export const useArticlesRatings =
    articleRatingFirebaseApi.useGetArticlesRatingsQuery;

export const useGetArticleRatingByUserId =
    articleRatingFirebaseApi.useGetArticleRatingByUserIdQuery;

export const useRatingsByArticleIdsList =
    articleRatingFirebaseApi.useGetRatingsByArticleIdsListQuery;

export const deleteRatingsByArticleId =
    articleRatingFirebaseApi.endpoints.deleteRatingsByArticleId.initiate;

export const rateArticleMutation =
    articleRatingFirebaseApi.endpoints.rateArticle.initiate;
