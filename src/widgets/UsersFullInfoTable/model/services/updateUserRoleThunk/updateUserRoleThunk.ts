import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    getUserAuthData,
    updateUserDataMutation,
    User,
    UserRole,
} from '@/entities/User';

/**
 * Thunk to update user role.
 *
 * This thunk updates the user's roles on the server. It handles scenarios where user data
 * is not available and manages errors that may occur during the process.
 *
 * @param {UserRole[]} newRoles - The new roles to be assigned to the user.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more.
 * @returns {Promise<User>} The updated user object with new roles or an error message.
 */

export const updateUserRoleThunk = createAsyncThunk<
    User,
    UserRole[],
    ThunkConfig<string>
>('user/updateUserRole', async (newRoles, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;

    const userData = getUserAuthData(getState());

    if (!userData) {
        return rejectWithValue('No user data found.');
    }

    try {
        const response = await dispatch(
            updateUserDataMutation({
                userId: userData?.id,
                updates: {
                    roles: newRoles,
                },
            }),
        ).unwrap();

        if (!response || !response.roles) {
            return rejectWithValue('Failed to update user roles.');
        }

        return response;
    } catch (error) {
        console.error('Error updating user roles:', error);
        return rejectWithValue('An error occurred while updating user roles.');
    }
});
