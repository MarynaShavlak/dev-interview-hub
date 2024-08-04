import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

/**
 * Thunk to handle user login by username and password.
 *
 * @param {LoginByUsernameProps} authData - The authentication data containing username and password.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more.
 * @returns {Promise<User>} The authenticated user data or an error message.
 */

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;
    try {
        const response = await extra.api.post<User>('/login', authData);
        if (!response.data) {
            throw new Error('No data received from login API');
        }

        dispatch(userActions.setAuthData(response.data));
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        return rejectWithValue(
            'Login failed. Please check your username and password and try again.',
        );
    }
});
