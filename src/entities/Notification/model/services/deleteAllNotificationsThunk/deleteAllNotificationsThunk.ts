import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    removeAllGeneralNotificationsForUserMutation,
    removeAllPersonalNotificationsMutation,
} from '../../../api/notificationApi';
import { auth } from '../../../../../../json-server/firebase';

export const deleteAllNotificationsThunk = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('notification/deleteNotification', async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    const user = auth.currentUser;

    if (!user) {
        return rejectWithValue('No user data found.');
    }

    try {
        const [personalResult, generalResult] = await Promise.allSettled([
            dispatch(
                removeAllPersonalNotificationsMutation({
                    userId: user.uid,
                }),
            ).unwrap(),
            dispatch(
                removeAllGeneralNotificationsForUserMutation({
                    userId: user.uid,
                }),
            ).unwrap(),
        ]);

        return undefined;
    } catch (error) {
        return rejectWithValue(
            `Failed to delete for current user notifications `,
        );
    }
});
