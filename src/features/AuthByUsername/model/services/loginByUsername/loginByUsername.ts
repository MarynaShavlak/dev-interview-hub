import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { firestore } from '../../../../../../json-server/firebase';

interface LoginByUsernameProps {
    email: string;
    password: string;
}

/**
 * Thunk to handle user login by username and password.
 *
 * @param {LoginByUsernameProps} authData - The authentication data containing email and password.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more.
 * @returns {Promise<User>} The authenticated user data or an error message.
 */

export const loginByUsername = createAsyncThunk<
    any,
    LoginByUsernameProps,
    ThunkConfig<string>
>('auth/loginByUsername', async (authData, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;
    const { setUser } = userActions;
    const { auth } = extra;
    try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(
            auth,
            authData.email,
            authData.password,
        );

        if (!userCredential) {
            throw new Error('No user data returned from Firebase');
        }
        console.log('userCredential', userCredential);
        // const customUser: User = mapFirebaseUserToCustomUser(
        //     userCredential.user,
        // );
        const myId = userCredential.user.uid;
        const usersReference = collection(firestore, 'users');
        const data = await getDocs(usersReference);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        console.log('filteredData', filteredData);
        const user = filteredData.find((user) => user.id === myId);
        console.log('user in login', user);
        // dispatch(setUser(customUser));
        // handleUserAuthentication(user, '');
        return user;
    } catch (err) {
        console.error('Log in failed:', err);
        return rejectWithValue(
            'Log in failed. Please check your username and password and try again',
        );
    }
});
