import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { handleUserAuthentication, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchUserFromFirestore } from '../../../lib/utilities/fetchUserFromFirestore/fetchUserFromFirestore';

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

        if (!firebaseUser) {
            throw new Error('No user data returned from Firebase');
        }
        console.log('firebaseUser in login thunk', firebaseUser);

        const existingUser = await fetchUserFromFirestore(firebaseUser.uid);
        console.log('existingUser', existingUser);
        if (!existingUser) {
            throw new Error('Existing user not found in Firestore');
        }

        console.log('existingUser in login thunk', existingUser);
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
