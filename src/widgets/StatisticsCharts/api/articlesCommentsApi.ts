import { getDocs, query } from 'firebase/firestore';
import { ArticleComment } from '../model/types/articleComment';
import { firestoreApi } from '@/shared/api/rtkApi';
import { dataPoint } from '@/shared/lib/firestore/firestore';

export const articlesCommentsFirebaseApi = firestoreApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesComments: build.query<ArticleComment[], void>({
            async queryFn() {
                try {
                    const commentsCollection =
                        dataPoint<ArticleComment>('comments');
                    const queryRef = query(commentsCollection);
                    const querySnapshot = await getDocs(queryRef);

                    if (!querySnapshot.empty) {
                        const comments = querySnapshot.docs.map((doc) => ({
                            ...doc.data(),
                        }));
                        console.log('all comments', comments);
                        return { data: comments };
                    }

                    return {
                        error: {
                            name: 'NotFound',
                            message: 'Comments not found',
                        },
                    };
                } catch (error) {
                    console.error('Error fetching comments:', error);
                    return { error };
                }
            },
        }),
    }),
});

export const useArticlesComments =
    articlesCommentsFirebaseApi.useGetArticlesCommentsQuery;

// __________________________________________________________________-

// export const articlesCommentsApi = rtkApi.injectEndpoints({
//     endpoints: (build) => ({
//         getArticlesComments: build.query<ArticleComment[], null>({
//             query: () => ({
//                 url: '/comments',
//                 params: {
//                     _expand: ['user'],
//                 },
//             }),
//         }),
//     }),
// });
//
// export const useArticlesComments =
//     articlesCommentsApi.useGetArticlesCommentsQuery;
