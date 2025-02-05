import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { deleteUserMutation } from '../../../api/userApi';

export const deleteUserByAdminThunk = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>('user/deleteUserByAdmin', async (userId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!userId) {
        return rejectWithValue('User ID is required.');
    }

    try {
        const deletedUserId = await dispatch(
            deleteUserMutation(userId),
        ).unwrap();

        return deletedUserId;
    } catch (error) {
        return rejectWithValue(`Failed to delete user with id ${userId}`);
    }
});
