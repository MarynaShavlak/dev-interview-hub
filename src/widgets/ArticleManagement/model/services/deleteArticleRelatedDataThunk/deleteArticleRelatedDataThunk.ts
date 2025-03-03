import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { deleteCommentsByArticleId } from '@/features/ArticleComments';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { deleteRatingsByArticleId } from '@/features/ArticleRating';
import { ERROR_ARTICLE_MESSAGES } from '@/entities/Article';

export const deleteArticleRelatedDataThunk = createAsyncThunk<
    void,
    string,
    ThunkConfig<string>
>('article/deleteRelatedContent', async (articleId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!articleId) {
        return rejectWithValue(
            ERROR_ARTICLE_MESSAGES.ARTICLE_NOT_FOUND(articleId),
        );
    }

    const executeDelete = async (
        deleteAction: (id: string) => any,
        errorMessage: string,
    ) => {
        try {
            await dispatch(deleteAction(articleId)).unwrap();
        } catch (error) {
            throw handleThunkErrorMessage(error, errorMessage);
        }
    };

    try {
        await executeDelete(
            deleteCommentsByArticleId,
            ERROR_ARTICLE_MESSAGES.DELETE_COMMENTS,
        );

        await executeDelete(
            deleteRatingsByArticleId,
            ERROR_ARTICLE_MESSAGES.DELETE_RATINGS,
        );
        return undefined;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_ARTICLE_MESSAGES.DELETE_RELATED_DATA(articleId),
            ),
        );
    }
});
