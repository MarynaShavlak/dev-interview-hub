export {};

// import { query, onSnapshot } from 'firebase/firestore';
// import { EntityState } from '@reduxjs/toolkit';
// import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
// import { firestoreApi } from '@/shared/api/rtkApi';
// import { dataPoint } from '@/shared/lib/firestore/firestore';
// import { Article } from '@/entities/Article';
// import { articlesAdapter } from '../model/slices/articlesPageSlice';
//
// export const articleFirebaseApi = firestoreApi
//     .enhanceEndpoints({
//         addTagTypes: ['Articles'],
//     })
//     .injectEndpoints({
//         endpoints: (build) => ({
//             getArticles: build.query<EntityState<Article>, void>({
//                 providesTags: ['Articles'],
//                 keepUnusedDataFor: 3600,
//                 async queryFn(): Promise<
//                     QueryReturnValue<EntityState<Article>, unknown, unknown>
//                 > {
//                     try {
//                         const initialData: EntityState<Article> =
//                             articlesAdapter.getInitialState();
//                         return { data: initialData };
//                     } catch (error) {
//                         return { error: error as unknown };
//                     }
//                 },
//                 async onCacheEntryAdded(
//                     _,
//                     { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
//                 ) {
//                     await cacheDataLoaded;
//                     let unsubscribe;
//                     try {
//                         const collectionRef = dataPoint<Article>('articles');
//                         const queryRef = query(collectionRef);
//                         unsubscribe = onSnapshot(queryRef, (snapshot) => {
//                             updateCachedData((draft) => {
//                                 // return snapshot?.docs?.map((doc) =>
//                                 //     doc.data(),
//                                 // ) as Article[];
//                                 articlesAdapter.setAll(
//                                     draft,
//                                     snapshot.docs.map((doc) => doc.data()),
//                                 );
//                             });
//                         });
//                     } catch (error) {
//                         console.log('error in articles!', error);
//                         throw new Error('Something went wrong with articles.');
//                     }
//                     await cacheEntryRemoved;
//                     if (unsubscribe) {
//                         unsubscribe();
//                     }
//                 },
//             }),
//         }),
//     });
//
// export const useArticles = articleFirebaseApi.useGetArticlesQuery;
// export const getArticlesQuery =
//     articleFirebaseApi.endpoints.getArticles.initiate;
