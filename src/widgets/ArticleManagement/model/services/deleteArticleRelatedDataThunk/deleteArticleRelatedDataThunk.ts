import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR_MESSAGES } from '../../consts/errorMessages';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { deleteCommentsByArticleId } from '@/features/ArticleComments';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { deleteRatingsByArticleId } from '@/features/ArticleRating';

export const deleteArticleRelatedDataThunk = createAsyncThunk<
    void,
    string,
    ThunkConfig<string>
>('article/deleteAssociatedContent', async (articleId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    console.log('related__articleId', articleId);
    if (!articleId) {
        return rejectWithValue(ERROR_MESSAGES.MISSING_ARTICLE);
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
            ERROR_MESSAGES.DELETE_COMMENTS,
        );

        await executeDelete(
            deleteRatingsByArticleId,
            ERROR_MESSAGES.DELETE_RATINGS,
        );
        return undefined;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_MESSAGES.DELETE_RELATED_DATA(articleId),
            ),
        );
    }
});
