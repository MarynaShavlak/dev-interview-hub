import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { deleteAllPersonalNotificationsMutation } from '../../../api/notificationApi';
import { auth } from '../../../../../../json-server/firebase';

export const deleteAllNotificationsThunk = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('notification/deleteNotification', async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    const user = auth.currentUser;
    // const authData = getUserAuthData(getState());
    if (!user) {
        return rejectWithValue('No user data found.');
    }

    try {
        await dispatch(
            deleteAllPersonalNotificationsMutation({
                userId: user.uid,
            }),
        );
        return undefined;
    } catch (error) {
        return rejectWithValue(
            `Failed to delete for current user notifications `,
        );
    }
});
