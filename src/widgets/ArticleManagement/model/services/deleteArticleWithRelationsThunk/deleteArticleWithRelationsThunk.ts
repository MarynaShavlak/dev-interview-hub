import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    deleteArticleThunk,
    getArticleDataByIdQuery,
} from '@/entities/Article';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { handleThunkErrorMessage } from '@/shared/lib/firestore/handleThunkErrorMessage/handleThunkErrorMessage';
import { ERROR_MESSAGES } from '../../consts/errorMessages';
import { deleteArticleRelatedDataThunk } from '../deleteArticleRelatedDataThunk/deleteArticleRelatedDataThunk';
import { deleteAllArticleContentImagesThunk } from '../deleteAllArticleContentImagesThunk/deleteAllArticleContentImagesThunk';

export const deleteArticleWithRelationsThunk = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>('article/deleteArticleWithRelations', async (articleId: string, thunkApi) => {
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
            deleteArticleThunk(articleId),
        ).unwrap();
        console.log('deletedArticleId', deletedArticleId);

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
            handleThunkErrorMessage(
                error,
                ERROR_MESSAGES.DELETE_FAIL(articleId),
            ),
        );
    }
});
