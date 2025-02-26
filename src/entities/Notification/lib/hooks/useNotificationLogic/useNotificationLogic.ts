import { useCallback } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteNotificationThunk } from '../../../model/services/deleteNotificationThunk/deleteNotificationThunk';
import { Notification } from '../../../model/types/notification';

export const useNotificationLogic = (notification: Notification) => {
    const { id, timestamp, type } = notification;
    dayjs.extend(relativeTime);
    const timeSpent = dayjs(timestamp).fromNow();
    const dispatch = useAppDispatch();

    const handleDeleteNotification = useCallback(async () => {
        try {
            await dispatch(
                deleteNotificationThunk({ notificationId: id, type }),
            );
            console.log('delete notification');
        } catch (error) {
            console.error('Failed to dismiss notification:', error);
        }
    }, [dispatch, id]);

    return { timeSpent, handleDeleteNotification };
};
