import { EntityState } from '@reduxjs/toolkit';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { onSnapshot, query } from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/rtkApi';
import { Article } from '../model/types/article';

import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { fetchDocumentByRef } from '@/shared/lib/firestore/fetchDocumentByRef/fetchDocumentByRef';

import { dataPoint } from '@/shared/lib/firestore/firestore';
import { articlesAdapter, initialState } from '../model/slices/articleSlice';

export const articleFirebaseApi = firestoreApi
    .enhanceEndpoints({
        addTagTypes: ['Articles'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getArticles: build.query<EntityState<Article>, void>({
                providesTags: ['Articles'],
                keepUnusedDataFor: 3600,

                async queryFn(): Promise<
                    QueryReturnValue<EntityState<Article>, unknown, unknown>
                > {
                    try {
                        const initialData: EntityState<Article> =
                            articlesAdapter.getInitialState();
                        return { data: initialData };
                    } catch (error) {
                        return { error: error as unknown };
                    }
                },
                async onCacheEntryAdded(
                    _,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;
                    let unsubscribe;
                    try {
                        const collectionRef = dataPoint<Article>('articles');
                        const queryRef = query(collectionRef);
                        unsubscribe = onSnapshot(queryRef, (snapshot) => {
                            updateCachedData((draft) => {
                                // console.log('Draft before update:', draft);

                                articlesAdapter.setAll(
                                    draft,
                                    snapshot.docs.map((doc) => doc.data()),
                                );

                                // console.log('Draft after update:', draft);
                            });
                        });
                    } catch (error) {
                        console.log('error in articles!', error);
                        throw new Error('Something went wrong with articles.');
                    }
                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
                },
            }),
            getArticleDataById: build.query<Article, string>({
                providesTags: (result, error, articleId) => [
                    { type: 'Articles', id: articleId },
                ],
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
        }),
    });

export const getArticleDataByIdQuery =
    articleFirebaseApi.endpoints.getArticleDataById.initiate;
export const useArticleDataById = articleFirebaseApi.useGetArticleDataByIdQuery;

export const useArticles = articleFirebaseApi.useGetArticlesQuery;
export const getArticlesQuery =
    articleFirebaseApi.endpoints.getArticles.initiate;

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

// ____________________________________________
// getArticleDataById: build.query<Article, string>({
//     async queryFn(articleId) {
//         try {
//             const articleDocRef = await getDocRefByField<Article>(
//                 'articles',
//                 'id',
//                 articleId,
//             );
//
//             const articleData =
//                 await fetchDocumentByRef<Article>(articleDocRef);
//             return { data: articleData };
//         } catch (error) {
//             return { error };
//         }
//     },
// }),
