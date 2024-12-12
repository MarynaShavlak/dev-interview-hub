import { EntityState } from '@reduxjs/toolkit';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { onSnapshot, query } from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/rtkApi';
import { Article } from '../model/types/article';

import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { fetchDocumentByRef } from '@/shared/lib/firestore/fetchDocumentByRef/fetchDocumentByRef';

import { dataPoint } from '@/shared/lib/firestore/firestore';
import { articlesAdapter } from '../model/slices/articleSlice';

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
                                // return snapshot?.docs?.map((doc) =>
                                //     doc.data(),
                                // ) as Article[];
                                articlesAdapter.setAll(
                                    draft,
                                    snapshot.docs.map((doc) => doc.data()),
                                );
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
                        return { error };
                    }
                },
            }),
        }),
    });

// export const useArticles = articleFirebaseApi.useGetArticlesQuery;
// export const getArticlesQuery =
//     articleFirebaseApi.endpoints.getArticles.initiate;

export const getArticleDataByIdQuery =
    articleFirebaseApi.endpoints.getArticleDataById.initiate;
const useArticleDataById = articleFirebaseApi.useGetArticleDataByIdQuery;

export const useArticles = articleFirebaseApi.useGetArticlesQuery;
export const getArticlesQuery =
    articleFirebaseApi.endpoints.getArticles.initiate;
