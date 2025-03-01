import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { deleteCommentMutation } from '../../../api/articleCommentsApi';
import { handleThunkErrorMessage } from '@/shared/lib/firestore/handleThunkErrorMessage/handleThunkErrorMessage';
import { ERROR_MESSAGES } from '../../consts/errorMessages';

export const deleteCommentFromArticleThunk = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>('articleComments/deletedCommentFromArticle', async (commentId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!commentId) {
        return rejectWithValue(ERROR_MESSAGES.COMMENT_ID_REQUIRED);
    }

    try {
        const deletedCommentId = await dispatch(
            deleteCommentMutation(commentId),
        ).unwrap();

        return deletedCommentId;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(error, ERROR_MESSAGES.DELETE_ERROR),
        );
    }
});
