import { createAsyncThunk } from '@reduxjs/toolkit';
import { onSnapshot } from 'firebase/firestore';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions, getUserDocRefById } from '@/entities/User';

export const getUserProfileThunk = createAsyncThunk<
    User,
    string,
    ThunkConfig<string>
>('profile/getProfileData', async (userId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    const { setUser } = userActions;
    console.log(userId, userId);
    if (!userId) {
        return rejectWithValue('No user ID info');
    }

    try {
        const userDocRef = await getUserDocRefById(userId);
        if (!userDocRef) {
            return rejectWithValue('User not found');
        }

        return await new Promise((resolve, reject) => {
            const unsubscribe = onSnapshot(
                userDocRef,
                (snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.data() as User;
                        dispatch(setUser(userData)); // Update the Redux store
                        resolve(userData); // Resolve the promise with user data
                    } else {
                        unsubscribe(); // Cleanup the listener
                        reject(rejectWithValue('User not found'));
                    }
                },
                (error) => {
                    unsubscribe(); // Cleanup the listener
                    reject(rejectWithValue(error.message));
                },
            );

            // Optionally, clean up on abort (if thunk gets canceled)
            thunkApi.signal.addEventListener('abort', () => {
                unsubscribe();
                reject(rejectWithValue('Request aborted'));
            });
        });
        // const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();
        // dispatch(setUser(response));
        // console.log('Auth in getAuth in Profile:', response);
        // return response;
    } catch (error) {
        console.error('Error during getting auth data:', error);
        return rejectWithValue('Failed to get auth data.');
    }
});
