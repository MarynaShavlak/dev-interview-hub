import { mergeNotifications } from '../mergeNotifications/mergeNotifications';
import { getUniqueNotifications } from '../getUniqueNotifications/getUniqueNotifications';
import { sortNotificationsByTimestamp } from '../sortNotificationsByTimestamp/sortNotificationsByTimestamp';
import {
    GeneralNotification,
    PersonalNotification,
} from '../../../model/types/notification';

export const getAllCachedSortedNotifications = (
    general: GeneralNotification[],
    personal: PersonalNotification[],
) => {
    const allNotifications = mergeNotifications(general, personal);

    const uniqueNotifications = getUniqueNotifications(allNotifications);

    return sortNotificationsByTimestamp(uniqueNotifications);
};
