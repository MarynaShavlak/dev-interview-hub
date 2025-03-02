import { createAsyncThunk } from '@reduxjs/toolkit';
import { signOut } from 'firebase/auth';
import { clearUserDataFromStorage } from '../../../lib/userUtils/userUtils';
import { userActions } from '../../slices/userSlice';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { handleThunkErrorMessage } from '@/shared/lib/firestore/handleThunkErrorMessage/handleThunkErrorMessage';
import { ERROR_USER_MESSAGES } from '../../consts/errorUserMessages';

/**
 * Thunk to log out the user.
 *
 * This thunk clears the user's session both from the Redux store and any persistent storage.
 * It also handles any potential errors during the logout process.
 *
 * @param {void} _ - This thunk does not use any arguments.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing
 *        dispatch, getState, extra, and more.
 * @returns {Promise<void>} A promise that resolves when the user is logged out.
 */

export const logoutUser = createAsyncThunk<void, void, ThunkConfig<string>>(
    'user/logout',
    async (_, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;
        const { auth } = extra;
        const { logout } = userActions;

        try {
            await signOut(auth);
            dispatch(logout());
            clearUserDataFromStorage();
        } catch (error) {
            return rejectWithValue(
                handleThunkErrorMessage(
                    error,
                    ERROR_USER_MESSAGES.LOGOUT_ERROR,
                ),
            );
        }
        return undefined;
    },
);
