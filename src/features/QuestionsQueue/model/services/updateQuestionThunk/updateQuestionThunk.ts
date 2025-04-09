import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Question } from '@/entities/Question';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { ERROR_QUESTION_MESSAGES } from '../../consts/errorQuestionMessages';
import { updateQuestionMutation } from '../../../api/questionsQueueApi';

export const updateQuestionThunk = createAsyncThunk<
    Question,
    Question,
    ThunkConfig<string>
>(
    'questionsQueue/updateQuestionInQueue',
    async (question: Question, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        try {
            const response = await dispatch(
                updateQuestionMutation({
                    questionId: question.id,
                    updates: question,
                }),
            ).unwrap();

            return response;
        } catch (error) {
            return rejectWithValue(
                handleThunkErrorMessage(
                    error,
                    ERROR_QUESTION_MESSAGES.UPDATE_QUESTION_ERROR(question.id),
                ),
            );
        }
    },
);
