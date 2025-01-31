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

        return deletedArticleId;
    } catch (error) {
        return rejectWithValue('Failed to delete article with');
    }
});
