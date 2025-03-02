export {};
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { onSnapshot } from 'firebase/firestore';
// import { ThunkConfig } from '@/app/providers/StoreProvider';
// import { Article } from '../../types/article';
// import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
// import { ERROR_ARTICLE_MESSAGES } from '../../consts/errorArticleMessages';
//
// /**
//  * Thunk to fetch an article by its ID from the API.
//  *
//  * This thunk performs an API call to retrieve the article details using the provided
//  * article ID. It handles scenarios where the article ID is undefined or the API response
//  * is invalid. If the API call fails or returns an error, it handles the error appropriately.
//  *
//  * @param {string | undefined} articleId - The ID of the article to fetch. If undefined,
//  *        the thunk will reject with an error.
//  * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing
//  *        dispatch, getState, extra, and more.
//  * @returns {Promise<Article>} The article data retrieved from the API or an error message.
//  */
//
// export const fetchArticleByIdThunk = createAsyncThunk<
//     Article,
//     string | undefined,
//     ThunkConfig<string>
// >('article/fetchArticleById', async (articleId, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     if (!articleId) {
//         return rejectWithValue(ERROR_ARTICLE_MESSAGES.ARTICLE_ID_REQUIRED);
//     }
//
//     try {
//         const articleDocRef = await getDocRefByField<Article>(
//             'articles',
//             'id',
//             articleId,
//         );
//         if (!articleDocRef) {
//             return rejectWithValue('Article not found');
//         }
//
//         return await new Promise((resolve, reject) => {
//             const unsubscribe = onSnapshot(
//                 articleDocRef,
//                 (snapshot) => {
//                     if (snapshot.exists()) {
//                         const articleData = snapshot.data() as Article;
//                         // dispatch(setUser(userData));
//                         resolve(articleData); // Resolve the promise with user data
//                     } else {
//                         unsubscribe(); // Cleanup the listener
//                         reject(rejectWithValue('Article not found'));
//                     }
//                 },
//                 (error) => {
//                     unsubscribe(); // Cleanup the listener
//                     reject(rejectWithValue(error.message));
//                 },
//             );
//
//             // Optionally, clean up on abort (if thunk gets canceled)
//             thunkApi.signal.addEventListener('abort', () => {
//                 unsubscribe();
//                 reject(rejectWithValue('Request aborted'));
//             });
//         });
//         //
//         // const response = await extra.api.get<Article>(
//         //     `/articles/${articleId}`,
//         //     {
//         //         params: {
//         //             _expand: 'user',
//         //         },
//         //     },
//         // );
//         //
//         // if (!response.data) {
//         //     return rejectWithValue('Article not found.');
//         // }
//         //
//         // return response.data;
//     } catch (error) {
//         console.error('Error fetching article by ID:', error);
//         return rejectWithValue('Failed to fetch article.');
//     }
// });
