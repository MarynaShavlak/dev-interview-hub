import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDoc } from 'firebase/firestore';

import { handleUserAuthentication, User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { prepareUserData } from '../../../lib/utilities/prepareUserData/prepareUserData';
import { fetchUserFromFirestore } from '../../../lib/utilities/fetchUserFromFirestore/fetchUserFromFirestore';
import { checkUserExists } from '../../../lib/utilities/checkUserExists/checkUserExists';
import { signInWithGoogle } from '../../../lib/utilities/signInWithGoogle/signInWithGoogle';
import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';

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

            // console.log('userData in Google Provider', userData);
        } else {
            const existingUser = await fetchUserFromFirestore(firebaseUser.uid);
            if (!existingUser) {
                throw new Error('Existing user not found in Firestore');
            }
            userData = existingUser;
            console.log('existingUser from google', existingUser);
        }

        console.log('by google data to set in slice', userData);
        // const customUser = mapFirebaseUserToCustomUser(firebaseUser);
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

// const usersReference = collection(firestore, 'users');
// const q = query(usersReference, where('id', '==', firebaseUser.uid));
// const querySnapshot = await getDocs(q);
//
// let loggedUserData;
// if (!querySnapshot.empty) {
//     const userDocRef = querySnapshot.docs[0].ref;
//     const doc = await getDoc(userDocRef);
//     loggedUserData = doc.data();
// }
