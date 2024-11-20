import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { User } from '../../types/user';
import { getUserDataByIdQuery } from '../../../api/userApi';

export const getAuthData = createAsyncThunk<User, string, ThunkConfig<string>>(
    'user/getAuthData',
    async (userId, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        console.log(userId, userId);
        if (!userId) {
            return rejectWithValue('No user ID info');
        }

        try {
            const response = await dispatch(
                getUserDataByIdQuery(userId),
            ).unwrap();
            console.log('response in getAuthData', response);

            return response;
        } catch (error) {
            console.error('Error during getting auth data:', error);
            return rejectWithValue('Failed to get auth data.');
        }
    },
);
