import { createAsyncThunk } from '@reduxjs/toolkit';
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

    try {
        try {
            await dispatch(deleteCommentsByArticleId(articleId)).unwrap();
        } catch (error) {
            return rejectWithValue(
                handleThunkErrorMessage(error, ERROR_MESSAGES.DELETE_COMMENTS),
            );
        }

        try {
            await dispatch(deleteRatingsByArticleId(articleId)).unwrap();
        } catch (error) {
            return rejectWithValue(
                handleThunkErrorMessage(error, ERROR_MESSAGES.DELETE_RATINGS),
            );
        }
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_MESSAGES.DELETE_RELATED_DATA(articleId),
            ),
        );
    }
});
