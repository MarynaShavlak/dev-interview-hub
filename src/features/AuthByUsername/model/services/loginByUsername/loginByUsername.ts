import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    UserCredential,
} from 'firebase/auth';
import { User as FirebaseUser } from '@firebase/auth';
import { handleUserAuthentication, User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

// interface ExtraDataBySingUpEmail {
//     signUpCall: (params: { password: string; email: string }) => any;
// }

interface SignupByEmailProps {
    email: string;
    password: string;
}

const mapFirebaseUserToCustomUser = (firebaseUser: FirebaseUser): User => {
    return {
        id: firebaseUser.uid,
        username: firebaseUser.email || 'Unknown',
        avatar: firebaseUser.photoURL || undefined,
    };
};

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
    const { setUser } = userActions;
    const { auth } = extra;
    try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(
            auth,
            authData.username,
            authData.password,
        );

        if (!userCredential) {
            throw new Error('No user data returned from Firebase');
        }
        const customUser: User = mapFirebaseUserToCustomUser(
            userCredential.user,
        );
        dispatch(setUser(customUser));
        handleUserAuthentication(customUser);
        return customUser;
    } catch (err) {
        console.error('Log in failed:', err);
        return rejectWithValue(
            'Log in failed. Please check your username and password and try again',
        );
    }
});

export const signupByEmail = createAsyncThunk<
    User,
    SignupByEmailProps,
    ThunkConfig<string>
>('login/signupByEmail', async (authData, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;
    const { setUser } = userActions;
    const { auth } = extra;
    try {
        const userCredential: UserCredential =
            await createUserWithEmailAndPassword(
                auth,
                authData.email,
                authData.password,
            );

        if (!userCredential) {
            throw new Error('No user data returned from Firebase');
        }
        const customUser: User = mapFirebaseUserToCustomUser(
            userCredential.user,
        );

        dispatch(setUser(customUser));
        handleUserAuthentication(customUser);
        return customUser;
    } catch (err) {
        console.error('Signup failed failed:', err);
        return rejectWithValue('Signup failed. Please try again.');
    }
});
