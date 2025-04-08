import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { ERROR_QUESTION_MESSAGES } from '../../consts/errorQuestionMessages';
import { deleteQuestionMutation } from '../../../api/questionsQueueApi';

export const deleteQuestionThunk = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>('questionsQueue/deleteQuestionFromQueue', async (questionId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!questionId) {
        return rejectWithValue(ERROR_QUESTION_MESSAGES.QUESTION_ID_REQUIRED);
    }

    try {
        const deletedQuestionId = await dispatch(
            deleteQuestionMutation(questionId),
        ).unwrap();

        return deletedQuestionId;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_QUESTION_MESSAGES.DELETE_ERROR,
            ),
        );
    }
});
