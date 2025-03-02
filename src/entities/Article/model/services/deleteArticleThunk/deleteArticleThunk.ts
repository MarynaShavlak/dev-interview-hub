import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { deleteArticleMutation } from '../../../api/articleApi';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { ERROR_ARTICLE_MESSAGES } from '../../consts/errorArticleMessages';

export const deleteArticleThunk = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>('article/deleteArticle', async (articleId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!articleId) {
        return rejectWithValue(ERROR_ARTICLE_MESSAGES.ARTICLE_ID_REQUIRED);
    }

    try {
        const deletedArticleId = await dispatch(
            deleteArticleMutation(articleId),
        ).unwrap();

        return deletedArticleId;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(error, ERROR_ARTICLE_MESSAGES.DELETE_ERROR),
        );
    }
});
