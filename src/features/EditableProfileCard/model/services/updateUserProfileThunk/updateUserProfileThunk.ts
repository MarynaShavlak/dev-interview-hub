import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ValidateProfileError } from '../../consts/consts';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { updateUserDataMutation, User, userActions } from '@/entities/User';

export const updateUserProfileThunk = createAsyncThunk<
    User,
    void,
    ThunkConfig<ValidateProfileError[]>
>('profile/updateUserProfile', async (User, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    const { setUser } = userActions;
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

        dispatch(setUser(response));
        return response;
    } catch (error) {
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});
