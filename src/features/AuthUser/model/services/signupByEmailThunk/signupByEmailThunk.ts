import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { handleUserAuthentication, User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FirebaseAuthErrorCode } from '../../types/firebaseAuthErrorCode';
import { prepareUserData } from '../../../lib/utilities/prepareUserData/prepareUserData';
import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';

export interface SignupCredentials {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}

// export const mapFirebaseUserToCustomUser = (
//     firebaseUser: FirebaseUser,
// ): User => {
//     return {
//         id: firebaseUser.uid,
//         username: firebaseUser.email || 'Unknown',
//         avatar: firebaseUser.photoURL || undefined,
//     };
// };

const handleFirebaseError = (error: {
    code: FirebaseAuthErrorCode;
    message: string;
}) => {
    switch (error.code) {
        case 'auth/email-already-in-use':
            return 'auth/email-already-in-use';
        case 'auth/invalid-email':
            return 'auth/invalid-email';
        case 'auth/too-many-requests':
            return 'auth/too-many-requests';
        default:
            return `Signup failed due to: ${error.message}`;
    }
};

export const signupByEmailThunk = createAsyncThunk<
    User,
    SignupCredentials,
    ThunkConfig<string>
>('login/signupByEmail', async (signUpData, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;
    const { setUser, setAuthData } = userActions;
    const { auth, firestore } = extra;
    try {
        const { user: firebaseUser } = await createUserWithEmailAndPassword(
            auth,
            signUpData.email,
            signUpData.password,
        );

        if (!firebaseUser) {
            throw new Error('No user data returned from Firebase');
        }
        const data: User = prepareUserData(firebaseUser, signUpData);
        const userDocRef = await addDocToFirestore<User>('users', data);
        // const documentId = userDocRef.id;
        const doc = await getDoc(userDocRef);
        const userData = doc.data();
        console.log('userData in SignupByEmail', userData);

        // console.log('New user document ID:', documentId);
        // const customUser: User = mapFirebaseUserToCustomUser(firebaseUser);

        dispatch(setUser(data));
        dispatch(setAuthData(data));
        handleUserAuthentication(data, userData?.id || '');
        return data;
    } catch (err) {
        const firebaseError = err as {
            code: FirebaseAuthErrorCode;
            message: string;
        };
        const errorMessage = firebaseError.code
            ? handleFirebaseError(firebaseError)
            : 'Signup failed. Please try again.';

        console.error('Error during signup:', err);
        return rejectWithValue(errorMessage);
    }
});
