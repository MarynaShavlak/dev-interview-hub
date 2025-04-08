import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { addQuestionMutation } from '../../../api/questionsQueueApi';
import { ERROR_QUESTION_MESSAGES } from '../../consts/errorQuestionMessages';
import { Question } from '@/entities/Question';

export const addQuestionThunk = createAsyncThunk<
    Question,
    { text: string },
    ThunkConfig<string>
>('questionsQueue/addQuestionsToQueue', async ({ text }, thunkApi) => {
    const { dispatch, rejectWithValue, getState } = thunkApi;

    try {
        const userData = getUserAuthData(getState());

        if (!userData) {
            return rejectWithValue(ERROR_QUESTION_MESSAGES.USER_AUTH_MISSING);
        }

        if (!text || text.trim() === '') {
            return rejectWithValue(
                ERROR_QUESTION_MESSAGES.QUESTION_TEXT_REQUIRED,
            );
        }

        const questionId = v4();
        const addedQuestion = await dispatch(
            addQuestionMutation({
                userId: userData.id,
                text,
                id: questionId,
            }),
        ).unwrap();

        return addedQuestion;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_QUESTION_MESSAGES.QUESTION_ADD_API_FAIL,
            ),
        );
    }
});
