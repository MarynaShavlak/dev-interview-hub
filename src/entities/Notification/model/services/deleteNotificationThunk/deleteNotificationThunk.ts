import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    markGeneralNotificationAsDismissedMutation,
    markPersonalNotificationAsDismissedMutation,
} from '../../../api/notificationApi';
import { NotificationType } from '../../types/notification';
import { ERROR_MESSAGES } from '../../consts/errorMessages';
import { handleThunkErrorMessage } from '@/shared/lib/firestore/handleThunkErrorMessage/handleThunkErrorMessage';

type DeleteNotificationArgs = {
    notificationId: string;
    type: NotificationType;
};

export const deleteNotificationThunk = createAsyncThunk<
    string,
    DeleteNotificationArgs,
    ThunkConfig<string>
>(
    'notification/deleteNotification',
    async ({ notificationId, type }, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;
        const { auth } = extra;
        const user = auth.currentUser;

        if (!user) {
            return rejectWithValue(ERROR_MESSAGES.USER_NOT_AUTHORIZED);
        }

        if (!notificationId) {
            return rejectWithValue(ERROR_MESSAGES.NOTIFICATION_ID_REQUIRED);
        }

        try {
            if (type === 'general') {
                await dispatch(
                    markGeneralNotificationAsDismissedMutation({
                        notificationId,
                        userId: user.uid,
                    }),
                );
            } else {
                await dispatch(
                    markPersonalNotificationAsDismissedMutation({
                        notificationId,
                        userId: user.uid,
                    }),
                );
            }

            return notificationId;
        } catch (error) {
            return rejectWithValue(
                handleThunkErrorMessage(
                    error,
                    ERROR_MESSAGES.DELETE_NOTIFICATION_FAIL(notificationId),
                ),
            );
        }
    },
);
