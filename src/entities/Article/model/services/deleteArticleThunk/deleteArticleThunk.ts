import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    deleteArticleMutation,
    getArticleDataByIdQuery,
} from '../../../api/articleApi';
import { handleThunkError } from '../../../lib/utilities/handleThunkError/handleThunkError';
import { deleteAllArticleContentImagesThunk } from '../deleteAllArticleContentImagesThunk/deleteAllArticleContentImagesThunk';
import { deleteArticleRelatedDataThunk } from '../deleteArticleRelatedDataThunk/deleteArticleRelatedDataThunk';
import { ERROR_MESSAGES } from '../../consts/errorMessages';

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
        const article = await dispatch(
            getArticleDataByIdQuery(articleId),
        ).unwrap();
        if (!article) {
            return rejectWithValue('Article not found.');
        }

        const deletedArticleId = await dispatch(
            deleteArticleMutation(articleId),
        ).unwrap();

        if (deletedArticleId) {
            await dispatch(
                deleteAllArticleContentImagesThunk(article),
            ).unwrap();
            await dispatch(
                deleteArticleRelatedDataThunk(deletedArticleId),
            ).unwrap();
        }

        return deletedArticleId;
    } catch (error) {
        return rejectWithValue(
            handleThunkError(error, ERROR_MESSAGES.DELETE_FAIL(articleId)),
        );
    }
});
