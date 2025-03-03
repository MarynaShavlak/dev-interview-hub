import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    ERROR_USER_MESSAGES,
    updateUserDataMutation,
    User,
    UserRole,
} from '@/entities/User';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';

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

interface UpdateUserRoleParams {
    userId: string;
    newRoles: UserRole[];
}

export const updateUserRoleThunk = createAsyncThunk<
    User,
    UpdateUserRoleParams,
    ThunkConfig<string>
>('user/updateUserRole', async (params, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    const { userId, newRoles } = params;

    if (!userId) {
        return rejectWithValue(ERROR_USER_MESSAGES.USER_ID_REQUIRED);
    }

    try {
        const response = await dispatch(
            updateUserDataMutation({
                userId,
                updates: {
                    roles: newRoles,
                },
            }),
        ).unwrap();

        if (!response || !response.roles) {
            return rejectWithValue(ERROR_USER_MESSAGES.UPDATE_USER_ROLE_ERROR);
        }

        return response;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_USER_MESSAGES.UPDATE_USER_ROLE_ERROR,
            ),
        );
    }
});
