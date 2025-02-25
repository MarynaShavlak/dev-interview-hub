import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';
import { dismissNotificationMutation } from '../../../api/notificationApi';

// Create async thunk for deleting notifications
export const deleteNotificationThunk = createAsyncThunk<
    string, // Return type: deleted notification ID
    string, // First argument type: notification ID
    ThunkConfig<string> // Thunk configuration type
>('notification/deleteNotification', async (notificationId, thunkApi) => {
    const { rejectWithValue, dispatch, getState } = thunkApi;
    const authData = getUserAuthData(getState());
    if (!authData) {
        return rejectWithValue('No user data found.');
    }
    const userId = authData.id;

    if (!notificationId) {
        return rejectWithValue('Notification ID is required.');
    }

    try {
        await dispatch(
            dismissNotificationMutation({
                notificationId,
                userId,
            }),
        );

        return notificationId;
    } catch (error) {
        return rejectWithValue(
            `Failed to dismiss for current user notification with id ${notificationId}`,
        );
    }
});
