// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ThunkConfig } from '@/app/providers/StoreProvider';
// import { deleteArticleMutation } from '../../../api/articleApi';
// import { Article } from '../../../model/types/article';
//
// /**
//  * Thunk to handle deleting an article.
//  * - Ensures the article ID is provided.
//  * - Dispatches actions based on success or failure.
//  */
// export const deleteArticleThunk = createAsyncThunk<
//     string,
//     Article,
//     ThunkConfig<string>
// >('article/deleteArticle', async (article, thunkApi) => {
//     const { rejectWithValue, dispatch } = thunkApi;
//
//     if (!article.id) {
//         return rejectWithValue('Article ID is required.');
//     }
//
//     try {
//         const deletedArticleId = await dispatch(
//             deleteArticleMutation(article),
//         ).unwrap();
//         console.log(`Article with ID "${article.id}" has been deleted.`);
//         return deletedArticleId;
//     } catch (error) {
//         console.error(
//             `Failed to delete article with ID "${article.id}":`,
//             error,
//         );
//         return rejectWithValue('Failed to delete article.');
//     }
// });

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { deleteArticleMutation } from '../../../api/articleApi';

export const deleteArticleThunk = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>('article/deleteArticle', async (articleId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!articleId) {
        return rejectWithValue('Article ID is required.');
    }

    try {
        const deletedArticleId = await dispatch(
            deleteArticleMutation(articleId),
        ).unwrap();
        console.log(`Article with ID "${articleId}" has been deleted.`);
        return deletedArticleId;
    } catch (error) {
        console.error(
            `Failed to delete article with ID "${articleId}":`,
            error,
        );
        return rejectWithValue('Failed to delete article.');
    }
});
