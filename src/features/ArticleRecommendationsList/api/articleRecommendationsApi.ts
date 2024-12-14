import { getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { Article, ArticleCategory } from '@/entities/Article';

import { firestoreApi } from '@/shared/api/rtkApi';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { getRandomItems } from '@/shared/lib/mathCalculations/getRandomItems';

interface ArticleRecommendationsParams {
    limit: number;
    category: ArticleCategory;
    exceptArticleId: string;
}

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
                        console.log('category: ', category);
                        const collectionRef = dataPoint<Article>('articles');
                        let queryRef = query(collectionRef);

                        // Filter by category
                        if (category) {
                            queryRef = query(
                                queryRef,
                                where(
                                    'category',
                                    'array-contains-any',
                                    category,
                                ),
                            );
                        }

                        if (exceptArticleId) {
                            queryRef = query(
                                queryRef,
                                where('id', '!=', exceptArticleId),
                            );
                        }

                        const recommendations: Article[] = [];
                        const querySnapshot = await getDocs(queryRef);
                        querySnapshot.forEach((doc) => {
                            recommendations.push(doc.data());
                        });

                        return { data: getRandomItems(recommendations, 3) };
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
                        console.log('category1111: ', category);
                        const collectionRef = dataPoint<Article>('articles');
                        let queryRef = query(
                            collectionRef,
                            where('category', 'array-contains-any', category),
                        );
                        if (exceptArticleId) {
                            queryRef = query(
                                queryRef,
                                where('id', '!=', exceptArticleId),
                            );
                        }
                        unsubscribe = onSnapshot(queryRef, (snapshot) => {
                            updateCachedData((draft) => {
                                const result = getRandomItems(
                                    snapshot?.docs?.map((doc) =>
                                        doc.data(),
                                    ) as Article[],
                                    3,
                                );
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
