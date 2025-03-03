import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    deleteArticleThunk,
    ERROR_ARTICLE_MESSAGES,
    getArticleDataByIdQuery,
} from '@/entities/Article';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { deleteArticleRelatedDataThunk } from '../deleteArticleRelatedDataThunk/deleteArticleRelatedDataThunk';
import { deleteAllArticleContentImagesThunk } from '../deleteAllArticleContentImagesThunk/deleteAllArticleContentImagesThunk';

export const deleteArticleWithRelationsThunk = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>('article/deleteArticleWithRelations', async (articleId: string, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    if (!articleId) {
        return rejectWithValue(
            ERROR_ARTICLE_MESSAGES.ARTICLE_NOT_FOUND(articleId),
        );
    }

    try {
        const article = await dispatch(
            getArticleDataByIdQuery(articleId),
        ).unwrap();
        if (!article) {
            return rejectWithValue(
                ERROR_ARTICLE_MESSAGES.ARTICLE_NOT_FOUND(articleId),
            );
        }

        const deletedArticleId = await dispatch(
            deleteArticleThunk(articleId),
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
            handleThunkErrorMessage(
                error,
                ERROR_ARTICLE_MESSAGES.DELETE_ARTICLE_ERROR(articleId),
            ),
        );
    }
});
