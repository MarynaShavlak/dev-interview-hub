import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleComment } from '../../..';
import { getCommentsByArticleIdQuery } from '../../../api/articleCommentsApi';

/**
 * Thunk to fetch comments associated with a specific article ID.
 *
 * This thunk performs an API call to retrieve comments related to the article identified
 * by the given article ID. It handles scenarios where the article ID is missing or the
 * API response is invalid. If the API call fails or returns an error, it handles the error
 * appropriately.
 *
 * @param {string | undefined} articleId - The ID of the article to fetch comments for.
 *        If undefined, the thunk will reject with an error message.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing
 *        dispatch, getState, extra, and more.
 * @returns {Promise<ArticleComment[]>} A promise that resolves to an array of comments or
 *        rejects with an error message.
 */

export const fetchCommentsByArticleIdThunk = createAsyncThunk<
    ArticleComment[],
    string | undefined,
    ThunkConfig<string>
>('articleDetails/fetchCommentsByArticleId', async (articleId, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;
    console.log('articleId', articleId);

    if (!articleId) {
        return rejectWithValue('Article ID is required.');
    }
    try {
        const result = await dispatch(
            getCommentsByArticleIdQuery(articleId),
        ).unwrap();

        return result;
    } catch (error) {
        console.error('Error fetching comments by article ID:', error);
        return rejectWithValue('Failed to fetch comments.');
    }
});

// try {
//     const commentsByArticleRefs =
//         await getAllDocRefsByField<ArticleComment>(
//             'comments',
//             'aticleId,rticleId',
// //             ar
//         );
//
//     if (!commentsByArticleRefs || commentsByArticleRefs.length === 0) {
//         return rejectWithValue('Comments not found');
//     }
//
//     const commentsData: ArticleComment[] = [];
//     const unsubscribeFunctions: (() => void)[] = [];
//
//     return new Promise((resolve, reject) => {
//         let remaining = commentsByArticleRefs.length;
//
//         commentsByArticleRefs.forEach((docRef, index) => {
//             const unsubscribe = onSnapshot(
//                 docRef,
//                 (snapshot) => {
//                     if (snapshot.exists()) {
//                         const data = snapshot.data() as ArticleComment;
//                         commentsData.push(data);
//
//                         // Resolve once all comments have been received
//                         // eslint-disable-next-line no-plusplus
//                         if (--remaining === 0) {
//                             unsubscribeFunctions.forEach((unsub) =>
//                                 unsub(),
//                             ); // Cleanup
//                             resolve(commentsData); // Resolve with all the collected comments
//                         }
//                     } else {
//                         // eslint-disable-next-line no-plusplus
//                         remaining--; // Decrement remaining if snapshot doesn't exist
//                         if (remaining === 0) {
//                             unsubscribeFunctions.forEach((unsub) =>
//                                 unsub(),
//                             ); // Cleanup
//                             reject(rejectWithValue('Comments not found'));
//                         }
//                     }
//                 },
//                 (error) => {
//                     // eslint-disable-next-line no-plusplus
//                     remaining--; // Decrement remaining on error
//                     if (remaining === 0) {
//                         unsubscribeFunctions.forEach((unsub) => unsub()); // Cleanup
//                         reject(rejectWithValue(error.message));
//                     }
//                 },
//             );
//
//             // Store the unsubscribe function to clean up later
//             unsubscribeFunctions.push(unsubscribe);
//         });
//
//         // Optionally, clean up on abort (if thunk gets canceled)
//         thunkApi.signal.addEventListener('abort', () => {
//             unsubscribeFunctions.forEach((unsub) => unsub()); // Cleanup on abort
//             reject(rejectWithValue('Request aborted'));
//         });
//     });
//
//     // return await new Promise((resolve, reject) => {
//     //     const unsubscribe = onSnapshot(
//     //         commentsByArticleRefs,
//     //         (snapshot) => {
//     //             if (snapshot.exists()) {
//     //                 const commentsData =
//     //                     snapshot.data() as ArticleComment[];
//     //
//     //                 resolve(commentsData); // Resolve the promise with user data
//     //             } else {
//     //                 unsubscribe(); // Cleanup the listener
//     //                 reject(rejectWithValue('Comments not found'));
//     //             }
//     //         },
//     //         (error) => {
//     //             unsubscribe(); // Cleanup the listener
//     //             reject(rejectWithValue(error.message));
//     //         },
//     //     );
//     //
//     //     // Optionally, clean up on abort (if thunk gets canceled)
//     //     thunkApi.signal.addEventListener('abort', () => {
//     //         unsubscribe();
//     //         reject(rejectWithValue('Request aborted'));
//     //     });
//     // });
// } catch (error) {
//     console.error('Error fetching comments by article ID:', error);
//     return rejectWithValue('Failed to fetch comments.');
// }

// const response = await extra.api.get<Comment[]>('/comments', {
//     params: {
//         articleId,
//         _expand: 'user',
//     },
// });
//
// if (!response.data) {
//     return rejectWithValue('No comments found.');
// }
//
// return response.data;

//        // const commentsCollection = dataPoint<ArticleComment>('comments');
//         // console.log('commentsCollection', commentsCollection);
//         // const commentsQuery = query(
//         //     commentsCollection,
//         //     where('articleId', '==', articleId),
//         //     // orderBy('createdAt', 'desc'),
//         // );
//         // console.log('commentsQuery', commentsQuery);
//         // return await new Promise((resolve, reject) => {
//         //     const unsubscribe = onSnapshot(
//         //         commentsQuery,
//         //         (snapshot) => {
//         //             if (!snapshot.empty) {
//         //                 const commentsData = snapshot.docs.map((doc) => ({
//         //                     ...doc.data(),
//         //                 })) as ArticleComment[];
//         //
//         //                 resolve(commentsData);
//         //             } else {
//         //                 resolve([]);
//         //             }
//         //         },
//         //         (error) => {
//         //             unsubscribe();
//         //             reject(rejectWithValue(error.message));
//         //         },
//         //     );
//         //
//         //     thunkApi.signal.addEventListener('abort', () => {
//         //         unsubscribe();
//         //         reject(rejectWithValue('Request aborted'));
//         //     });
//         // });
