import { GeneralNotification } from '../../../model/types/notification';

export const filterDismissedNotifications = (
    notifications: GeneralNotification[],
    userId: string,
) => {
    return notifications.filter(
        (notification) => !notification.dismissedBy?.includes(userId),
    );
};
