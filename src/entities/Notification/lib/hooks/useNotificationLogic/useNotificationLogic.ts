import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';
import 'dayjs/locale/uk';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteNotificationThunk } from '../../../model/services/deleteNotificationThunk/deleteNotificationThunk';
import { Notification } from '../../../model/types/notification';

export const useNotificationLogic = (notification: Notification) => {
    const { id, timestamp, type, localizationMessage, localizationTitle } =
        notification;

    const dispatch = useAppDispatch();
    const { i18n } = useTranslation();
    dayjs.extend(relativeTime);
    const [timeSpent, setTimeSpent] = useState('');

    useEffect(() => {
        dayjs.locale(i18n.language === 'uk' ? 'uk' : 'en');
        setTimeSpent(dayjs(timestamp).fromNow());
    }, [i18n.language, timestamp]);

    const title =
        localizationTitle[i18n.language as keyof typeof localizationTitle] ||
        localizationTitle.en;
    const message =
        localizationMessage[
            i18n.language as keyof typeof localizationMessage
        ] || localizationMessage.en;

    const handleDeleteNotification = useCallback(async () => {
        try {
            await dispatch(
                deleteNotificationThunk({ notificationId: id, type }),
            );
        } catch (error) {
            console.error('Failed to dismiss notification:', error);
        }
    }, [dispatch, id, type]);

    return { timeSpent, handleDeleteNotification, title, message };
};
