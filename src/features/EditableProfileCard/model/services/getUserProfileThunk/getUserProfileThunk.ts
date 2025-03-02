import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery, User, userActions } from '@/entities/User';
import { ERROR_PROFILE_CARD_MESSAGES } from '../../consts/errorProfileCardMessages';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';

export const getUserProfileThunk = createAsyncThunk<
    User,
    string,
    ThunkConfig<string>
>('profile/getProfileData', async (userId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    const { setUser } = userActions;
    console.log(userId, userId);
    if (!userId) {
        return rejectWithValue(ERROR_PROFILE_CARD_MESSAGES.USER_ID_REQUIRED);
    }

    try {
        const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();
        dispatch(setUser(response));
        return response;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_PROFILE_CARD_MESSAGES.FAILED_TO_FETCH_PROFILE(userId),
            ),
        );
    }
});
