import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { ERROR_HR_INTERVIEW_MESSAGES } from '../../../model/consts/errorHRInterviewMessages';
import { deleteHRInterviewQAMutation } from '../../../api/hrInterviewApi';

export const deleteHRInterviewQAThunk = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>('article/deleteArticle', async (articleId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!articleId) {
        return rejectWithValue(
            ERROR_HR_INTERVIEW_MESSAGES.HR_INTERVIEW_ID_REQUIRED,
        );
    }

    try {
        const deletedArticleId = await dispatch(
            deleteHRInterviewQAMutation(articleId),
        ).unwrap();

        return deletedArticleId;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_HR_INTERVIEW_MESSAGES.DELETE_ERROR,
            ),
        );
    }
});
