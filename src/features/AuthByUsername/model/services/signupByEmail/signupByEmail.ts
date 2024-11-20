import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { handleUserAuthentication, User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FirebaseAuthErrorCode } from '../../types/firebaseAuthErrorCode';
import { addNewUserToFirestore } from '../../../lib/utilities/addNewUserToFirestore/addNewUserToFirestore';
import { prepareUserData } from '../../../lib/utilities/prepareUserData/prepareUserData';

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

export const signupByEmail = createAsyncThunk<
    User,
    SignupCredentials,
    ThunkConfig<string>
>('login/signupByEmail', async (signUpData, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;
    const { setUser } = userActions;
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
        const userDocRef = await addNewUserToFirestore(firestore, data);
        // const documentId = userDocRef.id;
        const doc = await getDoc(userDocRef);
        const userData = doc.data();
        console.log('userData', userData);

        // console.log('New user document ID:', documentId);
        // const customUser: User = mapFirebaseUserToCustomUser(firebaseUser);

        dispatch(setUser(data));
        handleUserAuthentication(data, userData?.id);
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
