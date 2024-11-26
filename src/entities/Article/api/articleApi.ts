import { getDocs, query, where } from 'firebase/firestore';
import { firestoreApi, rtkApi } from '@/shared/api/rtkApi';
import { Article } from '../model/types/article';
import { dataPoint } from '@/shared/lib/firestore/firestore';

export const articleApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticles: build.query<Article[], null>({
            query: () => ({
                url: '/articles',
                params: {
                    _expand: 'user',
                },
            }),
        }),
    }),
});

export const articleFirebaseApi = firestoreApi.injectEndpoints({
    endpoints: (build) => ({
        getArticles: build.query<Article[], null>({
            async queryFn() {
                try {
                    const articlesCollection = dataPoint<Article>('articles');
                    let queryRef = query(articlesCollection);
                    // queryRef = query(
                    //     articlesCollection,
                    //     orderBy('views', 'asc'),
                    //     // limit(10),
                    // );

                    // ___________Category______________
                    // if (category && category !== ArticleCategory.ALL) {
                    //     queryRef = query(queryRef, where('category', '==', category));
                    // }
                    // __________________________________________________-

                    queryRef = query(
                        queryRef,
                        where('category', 'array-contains', 'React'),
                    );

                    queryRef = query(
                        queryRef,
                        where('title', 'array-contains', 'React'),
                    );

                    const querySnapshot = await getDocs(queryRef);
                    const articles: Article[] = [];
                    if (!querySnapshot.empty) {
                        querySnapshot?.forEach((doc) => {
                            articles.push({ ...doc.data() });
                        });
                        return { data: articles };
                    }

                    return {
                        error: {
                            name: 'NotFound',
                            message: 'Articles not found',
                        },
                    };
                } catch (error) {
                    return { error };
                }
            },
        }),
    }),
});

// export const useArticles = articleApi.useGetArticlesQuery;
export const useArticles = articleFirebaseApi.useGetArticlesQuery;
