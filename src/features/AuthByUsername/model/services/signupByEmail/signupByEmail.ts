import { User as FirebaseUser } from '@firebase/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { handleUserAuthentication, User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export interface SignupByEmailProps {
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
    SignupByEmailProps,
    ThunkConfig<string>
>('login/signupByEmail', async (authData, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;
    const { setUser } = userActions;
    const { auth, firestore } = extra;
    try {
        const userCredential: UserCredential =
            await createUserWithEmailAndPassword(
                auth,
                authData.email,
                authData.password,
            );

        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('this user', user);
                const { uid } = user;
            }
        });

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
