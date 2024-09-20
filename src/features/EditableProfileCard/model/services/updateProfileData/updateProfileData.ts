import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../../consts/consts';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';

/**
 * Thunk to update the profile data.
 *
 *   @param {void} - No parameters.
 *   @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more.
 *   @returns A thunk action that resolves to the updated profile data.
 */

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const formData = getProfileForm(getState());
    const errors = validateProfileData(formData);

    if (!formData?.id) {
        return rejectWithValue([ValidateProfileError.INCORRECT_USER_DATA]);
    }

    if (errors.length) {
        return rejectWithValue(errors);
    }

    try {
        const response = await extra.api.put<Profile>(
            `/profile/${formData?.id}`,
            formData,
        );

        if (!response.data) {
            throw new Error('No data returned from API');
        }

        return response.data;
    } catch (error) {
        console.error('Failed to update profile data:', error);
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});
