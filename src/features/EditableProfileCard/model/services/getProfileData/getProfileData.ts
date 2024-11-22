import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '../../../../../entities/User/model/types/user';
import { getUserDataByIdQuery } from '../../../../../entities/User/api/userApi';
// import { userActions } from '../../../model/slices/userSlice';

export const getProfileData = createAsyncThunk<
    User,
    string,
    ThunkConfig<string>
>('profile/getProfileData', async (userId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    // const { setUser } = userActions;
    console.log(userId, userId);
    if (!userId) {
        return rejectWithValue('No user ID info');
    }

    try {
        const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();
        // dispatch(setUser(response));
        console.log('Auth in getAuth in Profile:', response);
        return response;
    } catch (error) {
        console.error('Error during getting auth data:', error);
        return rejectWithValue('Failed to get auth data.');
    }
});
