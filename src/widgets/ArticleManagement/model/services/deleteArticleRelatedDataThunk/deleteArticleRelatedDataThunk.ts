import { createAsyncThunk } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { ERROR_MESSAGES } from '../../consts/errorMessages';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { deleteCommentsByArticleId } from '@/features/ArticleComments';
import { handleThunkErrorMessage } from '@/shared/lib/firestore/handleThunkErrorMessage/handleThunkErrorMessage';
import { deleteRatingsByArticleId } from '@/features/ArticleRating';

export const deleteArticleRelatedDataThunk = createAsyncThunk<
    void,
    string,
    ThunkConfig<string>
>('article/deleteAssociatedContent', async (articleId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!articleId) {
        return rejectWithValue(ERROR_MESSAGES.MISSING_ARTICLE);
    }

    const executeDelete = useCallback(
        async (deleteAction: (id: string) => any, errorMessage: string) => {
            try {
                await dispatch(deleteAction(articleId)).unwrap();
            } catch (error) {
                throw handleThunkErrorMessage(error, errorMessage);
            }
        },
        [articleId, dispatch],
    );

    try {
        await executeDelete(
            deleteCommentsByArticleId,
            ERROR_MESSAGES.DELETE_COMMENTS,
        );

        await executeDelete(
            deleteRatingsByArticleId,
            ERROR_MESSAGES.DELETE_RATINGS,
        );
        return undefined;
    } catch (error) {
        return rejectWithValue(
            typeof error === 'string'
                ? error
                : handleThunkErrorMessage(
                      error,
                      ERROR_MESSAGES.DELETE_RELATED_DATA(articleId),
                  ),
        );
    }
});
