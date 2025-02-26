import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    dismissGeneralNotificationMutation,
    dismissPersonalNotificationMutation,
} from '../../../api/notificationApi';
import { auth } from '../../../../../../json-server/firebase';
import { NotificationType } from '../../types/notification';

type DeleteNotificationArgs = {
    notificationId: string;
    type: NotificationType;
};

export const deleteNotificationThunk = createAsyncThunk<
    string, // Return type: deleted notification ID
    DeleteNotificationArgs,
    ThunkConfig<string> // Thunk configuration type
>(
    'notification/deleteNotification',
    async ({ notificationId, type }, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;
        const user = auth.currentUser;
        // const authData = getUserAuthData(getState());
        if (!user) {
            return rejectWithValue('No user data found.');
        }
        // const userId = authData.id;

        if (!notificationId) {
            return rejectWithValue('Notification ID is required.');
        }

        try {
            if (type === 'general') {
                await dispatch(
                    dismissGeneralNotificationMutation({
                        notificationId,
                        userId: user.uid,
                    }),
                );
            } else {
                await dispatch(
                    dismissPersonalNotificationMutation({
                        notificationId,
                        userId: user.uid,
                    }),
                );
            }

            return notificationId;
        } catch (error) {
            return rejectWithValue(
                `Failed to dismiss for current user notification with id ${notificationId}`,
            );
        }
    },
);
