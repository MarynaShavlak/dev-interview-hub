import { User as FirebaseUser } from '@firebase/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import {
    handleUserAuthentication,
    User,
    userActions,
    UserFullInfo,
} from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FirebaseAuthErrorCode } from '../../types/firebaseAuthErrorCode';
import { getInitialUserData } from '../../../lib/utilities/getInitialUserData/getInitialUserData';
import { addNewUserToFirestore } from '../../../lib/utilities/addNewUserToFirestore/addNewUserToFirestore';

export interface SignupCredentials {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}

export const mapFirebaseUserToCustomUser = (
    firebaseUser: FirebaseUser,
): User => {
    return {
        id: firebaseUser.uid,
        username: firebaseUser.email || 'Unknown',
        avatar: firebaseUser.photoURL || undefined,
    };
};
export const signupByEmail = createAsyncThunk<
    User,
    SignupCredentials,
    ThunkConfig<string>
>('login/signupByEmail', async (signUpData, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;
    const { setUser } = userActions;
    const { auth, firestore } = extra;
    try {
        const userCredential: UserCredential =
            await createUserWithEmailAndPassword(
                auth,
                signUpData.email,
                signUpData.password,
            );

        const { uid } = userCredential.user;
        console.log('uid', uid);

        const data: UserFullInfo = {
            id: uid,
            username: signUpData.username,
            lastname: signUpData.lastname,
            firstname: signUpData.firstname,
            email: signUpData.email,
            avatar: '',
            // age: undefined,
            // currency: undefined,
            // country: undefined,
            ...getInitialUserData(),
        };

        await addNewUserToFirestore(firestore, data);
        // auth.onAuthStateChanged((user) => {
        //     if (user) {
        //         console.log('this user', user);
        //         const { uid } = user;
        //
        // });

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
        const firebaseError = err as {
            code: FirebaseAuthErrorCode;
            message: string;
        };
        if (firebaseError.code) {
            switch (firebaseError.code) {
                case 'auth/email-already-in-use':
                    return rejectWithValue('auth/email-already-in-use');
                case 'auth/invalid-email':
                    return rejectWithValue('auth/invalid-email');
                case 'auth/too-many-requests':
                    return rejectWithValue('auth/too-many-requests');
                default:
                    return rejectWithValue(
                        `Signup failed due to: ${firebaseError.message}`,
                    );
            }
        }

        return rejectWithValue('Signup failed. Please try again.');
    }
});
