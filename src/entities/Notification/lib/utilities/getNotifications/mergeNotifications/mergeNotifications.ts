import {
    GeneralNotification,
    PersonalNotification,
} from '../../../../model/types/notification';

export const mergeNotifications = (
    generalNotifications: GeneralNotification[],
    personalNotifications: PersonalNotification[],
): (GeneralNotification | PersonalNotification)[] => {
    return [...generalNotifications, ...personalNotifications];
};
