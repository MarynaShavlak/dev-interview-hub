import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDoc } from 'firebase/firestore';

import { handleUserAuthentication, User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { prepareUserData } from '../../../lib/utilities/prepareUserData/prepareUserData';
import { fetchUserFromFirestore } from '../../../lib/utilities/fetchUserFromFirestore/fetchUserFromFirestore';
import { checkUserExists } from '../../../lib/utilities/checkUserExists/checkUserExists';
import { signInWithGoogle } from '../../../lib/utilities/signInWithGoogle/signInWithGoogle';
import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { assertExists } from '@/shared/lib/checks/assertExists/assertExists';

export const authByGoogleThunk = createAsyncThunk<
    User,
    void,
    ThunkConfig<string>
>('auth/authByGoogleProvider', async (_, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;
    const { setUser, setAuthData } = userActions;
    const { auth, firestore } = extra;

    try {
        const firebaseUser = await signInWithGoogle(auth);
        const userExists = await checkUserExists(firebaseUser.uid);

        let userData: User;

        const data = prepareUserData(firebaseUser);

        if (!userExists) {
            const newUser = prepareUserData(firebaseUser);
            const userDocRef = await addDocToFirestore<User>('users', newUser);
            userData = newUser;
            const doc = await getDoc(userDocRef);
        } else {
            const existingUser = await fetchUserFromFirestore(firebaseUser.uid);
            assertExists(existingUser, 'Existing user not found in Firestore');

            userData = existingUser;
        }

        dispatch(setUser(userData));
        dispatch(setAuthData(userData));
        handleUserAuthentication(userData, firebaseUser.uid);

        return data;
    } catch (err) {
        console.error('Error during Google sign-in:', err);
        return rejectWithValue(
            'Failed to authenticate with Google. Please try again.',
        );
    }
});
