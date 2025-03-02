import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { deleteUserMutation } from '../../../api/userApi';
import { ERROR_USER_MESSAGES } from '../../consts/errorUserMessages';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';

export const deleteUserByAdminThunk = createAsyncThunk<
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
            deleteUserMutation(userId),
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
