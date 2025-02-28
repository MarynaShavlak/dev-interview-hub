import { onSnapshot } from 'firebase/firestore';
import { Article, ArticleCategory } from '@/entities/Article';
import { firestoreApi } from '@/shared/api/firestoreApi';
import { getRandomItems } from '@/shared/lib/mathCalculations/getRandomItems';
import { createArticlesRecommendationsQuery } from '../lib/utilities/createArticlesRecommendationsQuery/createArticlesRecommendationsQuery';
import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';

export const recommendationsFirebaseApi = firestoreApi
    .enhanceEndpoints({ addTagTypes: ['ArticleRecommendations'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getArticlesRecommendations: build.query<
                Article[],
                {
                    limit: number;
                    category: ArticleCategory[];
                    exceptArticleId: string;
                }
            >({
                providesTags: ['ArticleRecommendations'],
                keepUnusedDataFor: 3600,
                async queryFn({ category, limit, exceptArticleId }) {
                    try {
                        const queryRef = createArticlesRecommendationsQuery(
                            category,
                            exceptArticleId,
                        );

                        const data = await fetchQueryResults<Article>(queryRef);

                        return { data: getRandomItems(data, limit) };
                    } catch (error) {
                        console.error('Error fetching recommendations:', error);
                        return { error };
                    }
                },
                async onCacheEntryAdded(
                    { limit, category, exceptArticleId },
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;
                    let unsubscribe;
                    try {
                        const queryRef = createArticlesRecommendationsQuery(
                            category,
                            exceptArticleId,
                        );
                        unsubscribe = onSnapshot(queryRef, (snapshot) => {
                            updateCachedData((draft) => {
                                const updatedData = getRandomItems(
                                    snapshot.docs.map((doc) =>
                                        doc.data(),
                                    ) as Article[],
                                    limit,
                                );
                                draft.splice(0, draft.length, ...updatedData);
                            });
                        });
                    } catch (error) {
                        console.error('Error in recommendations!', error);
                    }

                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
                },
            }),
        }),
    });

export const useArticlesRecomendations =
    recommendationsFirebaseApi.useGetArticlesRecommendationsQuery;

// export const recommendationsApi = rtkApi.injectEndpoints({
//     endpoints: (build) => ({
//         getArticleRecommendationsList: build.query<
//             Article[],
//             ArticleRecommendationsParams
//         >({
//             query: ({ limit, category, exceptArticleId }) => ({
//                 url: '/articles',
//                 params: {
//                     _limit: limit,
//                     _expand: 'user',
//                     id_ne: exceptArticleId,
//                     category:
//                         category === ArticleCategory.ALL ? undefined : category,
//                 },
//             }),
//         }),
//     }),
// });
//
// export const useArticleRecommendationsList =
//     recommendationsApi.useGetArticleRecommendationsListQuery;
