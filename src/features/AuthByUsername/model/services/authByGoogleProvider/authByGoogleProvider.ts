import { User as FirebaseUser } from '@firebase/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Auth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { collection } from '@firebase/firestore';
import { Firestore, getDocs, query, where } from 'firebase/firestore';

import { handleUserAuthentication, User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { addNewUserToFirestore } from '../../../lib/utilities/addNewUserToFirestore/addNewUserToFirestore';
import { prepareUserData } from '../../../lib/utilities/prepareUserData/prepareUserData';

// export const mapFirebaseUserToCustomUser = (
//     firebaseUser: FirebaseUser,
// ): User => {
//     return {
//         id: firebaseUser.uid,
//         username: firebaseUser.email || 'Unknown',
//         avatar: firebaseUser.photoURL || undefined,
//     };
// };

const checkUserExists = async (
    firestore: Firestore,
    uid: string,
): Promise<boolean> => {
    const usersReference = collection(firestore, 'users');
    const existingUserQuery = query(usersReference, where('id', '==', uid));
    const existingUserSnapshot = await getDocs(existingUserQuery);
    return !existingUserSnapshot.empty;
};

const signInWithGoogle = async (auth: Auth): Promise<FirebaseUser> => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    if (!user) {
        throw new Error('No user data returned from Firebase');
    }
    return user;
};

export const authByGoogleProvider = createAsyncThunk<
    User,
    void,
    ThunkConfig<string>
>('auth/authByGoogleProvider', async (_, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;
    const { setUser } = userActions;
    const { auth, firestore } = extra;

    try {
        const firebaseUser = await signInWithGoogle(auth);
        const userExists = await checkUserExists(firestore, firebaseUser.uid);
        const data = prepareUserData(firebaseUser);
        let documentId;
        if (!userExists) {
            // const data: UserFullInfo = prepareUserData(firebaseUser);
            const userDocRef = await addNewUserToFirestore(firestore, data);
            documentId = userDocRef.id;
            console.log('New user document ID:', documentId);
        }

        console.log('by google data to set in slice', data);
        // const customUser = mapFirebaseUserToCustomUser(firebaseUser);
        dispatch(setUser(data));
        handleUserAuthentication(data, documentId || '');

        return data;
    } catch (err) {
        console.error('Error during Google sign-in:', err);
        return rejectWithValue(
            'Failed to authenticate with Google. Please try again.',
        );
    }
});
