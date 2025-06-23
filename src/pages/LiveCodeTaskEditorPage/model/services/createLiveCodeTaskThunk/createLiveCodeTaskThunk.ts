import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { getUserAuthData } from '@/entities/User';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import {
    LiveCode,
    addLiveCodeMutation,
    ERROR_LIVE_CODE_MESSAGES,
} from '@/entities/LiveCode';
import { ERROR_LIVE_CODE_EDITOR_MESSAGES } from '../../consts/errorLiveCodeEditorMessages';
import { getLiveCodeFormData } from '../../selectors/getLiveCodeSelectors';

export const createLiveCodeTaskThunk = createAsyncThunk<
    LiveCode,
    void,
    ThunkConfig<string>
>('liveCode/createLiveCodeTask', async (_, thunkApi) => {
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
        const newLiveCode: LiveCode = {
            ...formData,
            id: v4(),
            user: authData,
        };

        const createdLiveCode = await dispatch(
            addLiveCodeMutation(newLiveCode),
        ).unwrap();
        if (!createdLiveCode) {
            return rejectWithValue(
                ERROR_LIVE_CODE_MESSAGES.LIVE_CODE_RETRIEVAL_FAIL,
            );
        }

        return createdLiveCode;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_LIVE_CODE_MESSAGES.ADD_LIVE_CODE_FAIL,
            ),
        );
    }
});
