import {
    GeneralNotification,
    PersonalNotification,
} from '../../../../model/types/notification';

export const getUniqueNotifications = (
    notifications: (GeneralNotification | PersonalNotification)[],
) => {
    return notifications.filter(
        (notification, index, self) =>
            index === self.findIndex((n) => n.id === notification.id),
    );
};
