import { fetchPersonalNotifications } from '../fetchPersonalNotifications/fetchPersonalNotifications';
import { fetchGeneralNotifications } from '../fetchGeneralNotifications/fetchGeneralNotifications';
import { mergeNotifications } from '../mergeNotifications/mergeNotifications';
import { sortNotificationsByTimestamp } from '../sortNotificationsByTimestamp/sortNotificationsByTimestamp';

export const fetchAllNotifications = async (userId: string) => {
    const generalNotifications = await fetchGeneralNotifications(userId);
    const personalNotifications = await fetchPersonalNotifications();

    const allNotifications = mergeNotifications(
        generalNotifications,
        personalNotifications,
    );

    return sortNotificationsByTimestamp(allNotifications);
};
