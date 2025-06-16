import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getHRInterviewQAFormData } from '../../selectors/getCreateHRInterviewQASelectors';

import { getUserAuthData } from '@/entities/User';
import { ERROR_HR_INTERVIEW_EDITOR_MESSAGES } from '../../consts/errorHRInterviewQAEditorMessages';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';

import {
    ERROR_HR_INTERVIEW_MESSAGES,
    HRInterviewQA,
    updateHRInterviewQAMutation,
} from '@/entities/HRInterviewQA';
import { searchClient } from '@/shared/config/firebase/searchClient';

export const updateHRInterviewQAThunk = createAsyncThunk<
    HRInterviewQA,
    void,
    ThunkConfig<string>
>('hrInterviewQA/updateHRInterviewQA', async (_, thunkApi) => {
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
        const updatedHRInterviewQA = await dispatch(
            updateHRInterviewQAMutation({
                id: formData.id,
                updates: formData,
            }),
        ).unwrap();
        await searchClient.clearCache();

        if (!updatedHRInterviewQA) {
            return rejectWithValue(
                ERROR_HR_INTERVIEW_MESSAGES.UPDATED_DATA_RETRIEVAL_ERROR(
                    formData.id,
                ),
            );
        }

        return updatedHRInterviewQA;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_HR_INTERVIEW_MESSAGES.UPDATE_HR_INTERVIEW_ERROR(
                    formData.id,
                ),
            ),
        );
    }
});
