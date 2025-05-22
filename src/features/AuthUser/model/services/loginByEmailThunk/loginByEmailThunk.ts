import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { handleUserAuthentication, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchUserFromFirestore } from '../../../lib/utilities/fetchUserFromFirestore/fetchUserFromFirestore';
import { assertExists } from '@/shared/lib/checks/assertExists/assertExists';

interface loginByEmailProps {
    email: string;
    password: string;
}

/**
 * Thunk to handle user login by username and password.
 *
 * @param {loginByEmailProps} authData - The authentication data containing email and password.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more.
 * @returns {Promise<User>} The authenticated user data or an error message.
 */

export const loginByEmailThunk = createAsyncThunk<
    any,
    loginByEmailProps,
    ThunkConfig<string>
>('auth/loginByEmail', async (authData, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;
    const { setUser, setAuthData } = userActions;
    const { auth } = extra;
    try {
        const { user: firebaseUser } = await signInWithEmailAndPassword(
            auth,
            authData.email,
            authData.password,
        );
        assertExists(firebaseUser, 'No user data returned from Firebase');

        const existingUser = await fetchUserFromFirestore(firebaseUser.uid);
        assertExists(existingUser, 'Existing user not found in Firestore');

        dispatch(setUser(existingUser));
        dispatch(setAuthData(existingUser));
        handleUserAuthentication(existingUser, firebaseUser.uid);

        return existingUser;
    } catch (err) {
        console.error('Error during login', err);
        return rejectWithValue(
            'Log in failed. Please check your email and password and try again',
        );
    }
});
