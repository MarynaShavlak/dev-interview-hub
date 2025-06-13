import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getHRInterviewQAFormData } from '../../selectors/getCreateHRInterviewQASelectors';
import { getUserAuthData } from '@/entities/User';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import {
    HRInterviewQA,
    addHRInterviewQAMutation,
    ERROR_HR_INTERVIEW_MESSAGES,
} from '@/entities/HRInterviewQA';
import { ERROR_HR_INTERVIEW_EDITOR_MESSAGES } from '../../consts/errorHRInterviewQAEditorMessages';

export const createHRInterviewQAThunk = createAsyncThunk<
    HRInterviewQA,
    void,
    ThunkConfig<string>
>('hrInterviewQA/createHRInterviewQA', async (_, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;

    const formData = getHRInterviewQAFormData(getState());
    const authData = getUserAuthData(getState());

    if (!authData) {
        return rejectWithValue(ERROR_HR_INTERVIEW_MESSAGES.USER_NOT_FOUND);
    }

    if (!formData) {
        return rejectWithValue(ERROR_HR_INTERVIEW_EDITOR_MESSAGES.NO_FORM_DATA);
    }

    try {
        const newHRInterviewQA: HRInterviewQA = {
            ...formData,
            id: v4(),
            user: authData,
            // createdAt: new Date().toISOString(),
        };

        const createdHRInterviewQA = await dispatch(
            addHRInterviewQAMutation(newHRInterviewQA),
        ).unwrap();
        if (!createdHRInterviewQA) {
            return rejectWithValue(
                ERROR_HR_INTERVIEW_MESSAGES.HR_INTERVIEW_RETRIEVAL_FAIL,
            );
        }

        return createdHRInterviewQA;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_HR_INTERVIEW_MESSAGES.ADD_HR_INTERVIEW_FAIL,
            ),
        );
    }
});
