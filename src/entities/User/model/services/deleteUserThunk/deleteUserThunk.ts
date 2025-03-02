import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { deleteUserByAdminThunk } from '../deleteUserByAdminThunk/deleteUserByAdminThunk';
import { ERROR_USER_MESSAGES } from '../../consts/errorUserMessages';
import { handleThunkErrorMessage } from '@/shared/lib/firestore/handleThunkErrorMessage/handleThunkErrorMessage';

export const deleteUserThunk = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>('user/deleteUserByAdmin', async (userId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!userId) {
        return rejectWithValue(ERROR_USER_MESSAGES.USER_ID_REQUIRED);
    }

    try {
        const deletedUserId = await dispatch(
            deleteUserByAdminThunk(userId),
        ).unwrap();

        return deletedUserId;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_USER_MESSAGES.DELETE_USER_ERROR(userId),
            ),
        );
    }
});
