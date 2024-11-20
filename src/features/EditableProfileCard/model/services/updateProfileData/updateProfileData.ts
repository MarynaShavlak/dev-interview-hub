import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ValidateProfileError } from '../../consts/consts';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { updateUserDataMutation, User } from '@/entities/User';

export const updateProfileData = createAsyncThunk<
    User,
    void,
    ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (User, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;
    const formData = getProfileForm(getState());
    const errors = validateProfileData(formData);

    if (!formData?.id) {
        return rejectWithValue([ValidateProfileError.INCORRECT_USER_DATA]);
    }

    if (errors.length) {
        return rejectWithValue(errors);
    }

    try {
        const response = await dispatch(
            updateUserDataMutation({ userId: formData?.id, updates: formData }),
        ).unwrap();
        console.log('response in getAuthData', response);

        return response;
    } catch (error) {
        console.error('Failed to update user data:', error);
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});
