import {
    getDoc,
    onSnapshot,
    updateDoc,
    increment,
    getDocs,
} from 'firebase/firestore';
import { EntityState } from '@reduxjs/toolkit';
import { firestoreApi } from '@/shared/api/rtkApi';
import { Article } from '../model/types/article';
import { articlesAdapter, initialState } from '../model/slices/articleSlice';
import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { fetchDocumentByRef } from '@/shared/lib/firestore/fetchDocumentByRef/fetchDocumentByRef';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { createArticlesByUserQuery } from '../lib/utilities/createArticlesByUserQuery/createArticlesByUserQuery';
import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { deleteDocFromFirestore } from '@/shared/lib/firestore/deleteDocFromFirestore/deleteDocFromFirestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';

export const articleFirebaseApi = firestoreApi
    .enhanceEndpoints({
        addTagTypes: ['Articles'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getArticles: build.query<EntityState<Article>, void>({
                providesTags: ['Articles'],
                async queryFn() {
                    try {
                        const collectionRef = dataPoint<Article>('articles');
                        const snapshot = await getDocs(collectionRef);

                        const articles = snapshot.docs.map((doc) => ({
                            ...doc.data(),
                            id: doc.id,
                        })) as Article[];

                        return {
                            data: articlesAdapter.setAll(
                                articlesAdapter.getInitialState(),
                                articles,
                            ),
                        };
                    } catch (error) {
                        return { error: error as unknown };
                    }
                },
            }),
            getArticlesByUserId: build.query<Article[], string>({
                providesTags: [{ type: 'Articles', id: 'userId' }],
                keepUnusedDataFor: 3600,
                async queryFn(userId) {
                    try {
                        const articlesQuery = createArticlesByUserQuery(userId);

                        const articles =
                            await fetchQueryResults<Article>(articlesQuery);

                        return { data: articles };
                    } catch (error) {
                        console.error(
                            'Error fetching articles by user ID:',
                            error,
                        );
                        return {
                            error: 'Error fetching articles by user ID',
                        };
                    }
                },
                async onCacheEntryAdded(
                    userId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;
                    let unsubscribe;
                    try {
                        const articlesQuery = createArticlesByUserQuery(userId);

                        unsubscribe = onSnapshot(articlesQuery, (snapshot) => {
                            updateCachedData((draft) => {
                                const result = snapshot?.docs?.map((doc) =>
                                    doc.data(),
                                ) as Article[];

                                // draft.splice(0, draft.length, ...result);
                            });
                        });
                    } catch (error) {
                        console.error('Error in articles snapshot:', error);
                    }

                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
                },
            }),
            getArticleDataById: build.query<Article, string>({
                // providesTags: (result, error, articleId) => [
                //     { type: 'Articles', id: articleId },
                // ],
                async queryFn(articleId) {
                    try {
                        const articleDocRef = await getDocRefByField<Article>(
                            'articles',
                            'id',
                            articleId,
                        );

                        const articleData =
                            await fetchDocumentByRef<Article>(articleDocRef);
                        return { data: articleData };
                    } catch (error) {
                        console.error('Error fetching article data:', error);
                        return { error: { message: 'Article not found' } };
                    }
                },
                async onCacheEntryAdded(
                    articleId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;
                    let unsubscribe;
                    try {
                        const articleDocRef = await getDocRefByField<Article>(
                            'articles',
                            'id',
                            articleId,
                        );

                        unsubscribe = articleDocRef
                            ? onSnapshot(articleDocRef, (doc) => {
                                  if (doc.exists()) {
                                      updateCachedData(
                                          () => doc.data() as Article,
                                      );
                                  } else {
                                      console.log(
                                          'Article not found in snapshot',
                                      );
                                  }
                              })
                            : null;
                    } catch (error) {
                        console.error('Error in article data snapshot:', error);
                    }

                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
                },
            }),
            addArticle: build.mutation<Article, Article>({
                invalidatesTags: ['Articles'],
                async queryFn(newArticle) {
                    try {
                        const docRef = await addDocToFirestore<Article>(
                            'articles',
                            newArticle,
                        );

                        const createdDocSnapshot = await getDoc(docRef);

                        if (!createdDocSnapshot.exists()) {
                            throw new Error(
                                'Failed to retrieve created article.',
                            );
                        }
                        return {
                            data: createdDocSnapshot.data() as Article,
                        };
                    } catch (error) {
                        return { error };
                    }
                },
            }),
            deleteArticle: build.mutation<string, string>({
                invalidatesTags: ['Articles'],
                async queryFn(articleId) {
                    try {
                        await deleteDocFromFirestore('articles', articleId);
                        return { data: articleId };
                    } catch (error) {
                        return { error };
                    }
                },
            }),
            updateArticle: build.mutation<
                Article,
                { articleId: string; updates: Partial<Article> }
            >({
                invalidatesTags: ['Articles'],
                async queryFn({ articleId, updates }) {
                    try {
                        const articleDocRef = await getDocRefByField<Article>(
                            'articles',
                            'id',
                            articleId,
                        );

                        if (articleDocRef) {
                            await updateDoc(articleDocRef, updates);
                            const updatedDoc = await getDoc(articleDocRef);
                            const updatedData = updatedDoc.data();

                            if (updatedData) {
                                return {
                                    data: { ...updatedData } as Article,
                                };
                            }
                        }

                        return {
                            error: {
                                name: 'NotFound',
                                message: 'Article not found',
                            },
                        };
                    } catch (error) {
                        console.error('Error updating article:', error);
                        return { error };
                    }
                },
            }),
            incrementArticleViews: build.mutation<Article, string>({
                invalidatesTags: ['Articles'],
                async queryFn(articleId) {
                    try {
                        const articleDocRef = await getDocRefByField<Article>(
                            'articles',
                            'id',
                            articleId,
                        );

                        if (articleDocRef) {
                            await updateDoc(articleDocRef, {
                                views: increment(1),
                            });

                            const updatedDoc = await getDoc(articleDocRef);
                            const updatedData = updatedDoc.data();

                            if (updatedData) {
                                return {
                                    data: { ...updatedData } as Article,
                                };
                            }
                        }

                        return {
                            error: {
                                name: 'NotFound',
                                message: 'Article not found',
                            },
                        };
                    } catch (error) {
                        console.error(
                            'Error incrementing article views:',
                            error,
                        );
                        return { error };
                    }
                },
            }),
        }),
    });

export const getArticleDataByIdQuery =
    articleFirebaseApi.endpoints.getArticleDataById.initiate;
export const useArticleDataById = articleFirebaseApi.useGetArticleDataByIdQuery;

export const useGetArticles = articleFirebaseApi.useGetArticlesQuery;
export const useArticlesByUserId =
    articleFirebaseApi.useGetArticlesByUserIdQuery;
export const getArticlesQuery =
    articleFirebaseApi.endpoints.getArticles.initiate;

export const addArticleMutation =
    articleFirebaseApi.endpoints.addArticle.initiate;

export const deleteArticleMutation =
    articleFirebaseApi.endpoints.deleteArticle.initiate;
export const updateArticleMutation =
    articleFirebaseApi.endpoints.updateArticle.initiate;

export const incrementArticleViewsMutation =
    articleFirebaseApi.endpoints.incrementArticleViews.initiate;

type RootState = {
    [articleFirebaseApi.reducerPath]: ReturnType<
        typeof articleFirebaseApi.reducer
    >;
};

export const selectEntryResult = (state: RootState) =>
    articleFirebaseApi.endpoints.getArticles.select()(state).data;

const entrySelectors = articlesAdapter.getSelectors(
    (state: RootState) => selectEntryResult(state) ?? initialState,
);
export const selectAllArticles = entrySelectors.selectAll;
