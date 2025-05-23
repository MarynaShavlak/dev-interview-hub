import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { handleUserAuthentication, User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FirebaseAuthErrorCode } from '../../types/firebaseAuthErrorCode';
import { prepareUserData } from '../../../lib/utilities/prepareUserData/prepareUserData';
import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { ErrorCode } from '../../../lib/hooks/useErrorText/useErrorText';
import { assertExists } from '@/shared/lib/checks/assertExists/assertExists';

export interface SignupCredentials {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}

const handleFirebaseError = (error: {
    code: FirebaseAuthErrorCode;
    message: string;
}): ErrorCode => {
    switch (error.code) {
        case 'auth/email-already-in-use':
            return 'auth/email-already-in-use';
        case 'auth/invalid-email':
            return 'auth/invalid-email';
        case 'auth/too-many-requests':
            return 'auth/too-many-requests';
        default:
            return 'auth/unknown';
    }
};

export const signupByEmailThunk = createAsyncThunk<
    User,
    SignupCredentials,
    ThunkConfig<ErrorCode>
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
        assertExists(firebaseUser, 'No user data returned from Firebase');

        const data: User = prepareUserData(firebaseUser, signUpData);
        const userDocRef = await addDocToFirestore<User>('users', data);

        const doc = await getDoc(userDocRef);
        const userData = doc.data();

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
            : 'auth/unknown';

        console.error('Error during signup:', err);
        return rejectWithValue(errorMessage);
    }
});
