// import { getDoc } from 'firebase/firestore';
// import { firestoreApi } from '@/shared/api/rtkApi';
//
// import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
// import { Article } from '@/entities/Article';
// import { deleteDocFromFirestore } from '@/shared/lib/firestore/deleteDocFromFirestore/deleteDocFromFirestore';
//
// export const articleCreateFirebaseApi = firestoreApi
//     .enhanceEndpoints({
//         addTagTypes: ['Articles'],
//     })
//     .injectEndpoints({
//         endpoints: (build) => ({
//             addArticle: build.mutation<Article, Article>({
//                 invalidatesTags: [{ type: 'Articles', id: 'articleId' }],
//                 async queryFn(newArticle) {
//                     try {
//                         const docRef = await addDocToFirestore<Article>(
//                             'articles',
//                             newArticle,
//                         );
//
//                         const createdDocSnapshot = await getDoc(docRef);
//
//                         if (!createdDocSnapshot.exists()) {
//                             throw new Error(
//                                 'Failed to retrieve created article.',
//                             );
//                         }
//
//                         return {
//                             data: {
//                                 ...createdDocSnapshot.data(),
//                             } as Article,
//                         };
//                     } catch (error) {
//                         console.error('Error adding new article:', error);
//                         return { error };
//                     }
//                 },
//             }),
//             deleteArticle: build.mutation<void, Article>({
//                 invalidatesTags: [{ type: 'Articles', id: 'articleId' }],
//                 async queryFn(articleToDelete) {
//                     try {
//                         await deleteDocFromFirestore<Article>(
//                             'articles',
//                             articleToDelete,
//                         );
//                         return { data: undefined }; // Return an empty response to signify success
//                     } catch (error) {
//                         console.error(
//                             `Error deleting article with id "${articleToDelete.id}":`,
//                             error,
//                         );
//                         return { error };
//                     }
//                 },
//             }),
//         }),
//     });
//
// export const addArticleMutation =
//     articleCreateFirebaseApi.endpoints.addArticle.initiate;
//
// export const deleteArticleMutation =
//     articleCreateFirebaseApi.endpoints.deleteArticle.initiate;
export {};
