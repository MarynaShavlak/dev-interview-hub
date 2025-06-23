import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { getUserAuthData } from '@/entities/User';
import { ERROR_LIVE_CODE_EDITOR_MESSAGES } from '../../consts/errorLiveCodeEditorMessages';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';

import {
    ERROR_LIVE_CODE_MESSAGES,
    LiveCode,
    updateLiveCodeMutation,
} from '@/entities/LiveCode';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { getLiveCodeFormData } from '../../selectors/getLiveCodeSelectors';

export const updateLiveCodeTaskThunk = createAsyncThunk<
    LiveCode,
    void,
    ThunkConfig<string>
>('liveCode/updateLiveCodeTask', async (_, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;

    const formData = getLiveCodeFormData(getState());
    const authData = getUserAuthData(getState());

    if (!authData) {
        return rejectWithValue(ERROR_LIVE_CODE_MESSAGES.USER_NOT_FOUND);
    }

    if (!formData) {
        return rejectWithValue(ERROR_LIVE_CODE_EDITOR_MESSAGES.NO_FORM_DATA);
    }

    try {
        const updatedLiveCode = await dispatch(
            updateLiveCodeMutation({
                id: formData.id,
                updates: formData,
            }),
        ).unwrap();
        await searchClient.clearCache();

        if (!updatedLiveCode) {
            return rejectWithValue(
                ERROR_LIVE_CODE_MESSAGES.UPDATED_DATA_RETRIEVAL_ERROR(
                    formData.id,
                ),
            );
        }

        return updatedLiveCode;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_LIVE_CODE_MESSAGES.UPDATE_LIVE_CODE_ERROR(formData.id),
            ),
        );
    }
});
