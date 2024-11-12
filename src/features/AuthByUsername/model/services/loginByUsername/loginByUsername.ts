import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { handleUserAuthentication, User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { useAuthentication } from '../../../lib/hooks/useAuthentication/useAuthentication';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

interface ExtraDataBySingUpEmail {
    signUpCall: (params: { password: string; email: string }) => any;
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
        const { signInCall } = useAuthentication();
        const user = await signInCall({
            email: authData.username,
            password: authData.password,
        });
        // const response = await extra.api.post<User>('/login', authData);
        // if (!response.data) {
        //     throw new Error('No data received from login API');
        // }
        //
        // const user = response.data;
        //
        // await dispatch(userActions.setAuthData(user));
        //
        // handleUserAuthentication(user);
        if (!user) {
            throw new Error('No user data returned from Firebase');
        }

        dispatch(userActions.setUser(user));

        handleUserAuthentication(user);
        return user;
    } catch (error) {
        console.error('Login failed:', error);
        return rejectWithValue(
            'Login failed. Please check your username and password and try again.',
        );
    }
});

export const signupByEmail = createAsyncThunk<
    User,
    LoginByUsernameProps & ExtraDataBySingUpEmail,
    ThunkConfig<string>
>('login/signupByEmail', async (authData, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;

    try {
        const userCredential: UserCredential =
            await createUserWithEmailAndPassword(auth, email, password);
        const customUser: User = mapFirebaseUserToCustomUser(
            userCredential.user,
        );
        // dispatch(setUser(customUser));
        return customUser;
    } catch (err) {
        return rejectWithValue(err);
    }
    try {
        // const { signUpCall } = useAuthentication();
        const user = authData.signUpCall({
            email: authData.username,
            password: authData.password,
        });
        // const response = await extra.api.post<User>('/login', authData);
        // if (!response.data) {
        //     throw new Error('No data received from login API');
        // }
        //
        // const user = response.data;
        //
        // await dispatch(userActions.setAuthData(user));
        //
        // handleUserAuthentication(user);
        if (!user) {
            throw new Error('No user data returned from Firebase');
        }

        dispatch(userActions.setUser(user));

        handleUserAuthentication(user);
        return user;
    } catch (error) {
        console.error('Signup failed failed:', error);
        return rejectWithValue('Signup failed. Please try again.');
    }
});
