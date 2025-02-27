import { createUserNotificationQuery } from '../../createQuery/createGeneralNotificationsQuery/createGeneralNotificationsQuery';
import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { GeneralNotification } from '../../../../model/types/notification';
import { filterDismissedNotifications } from '../filterDismissedNotifications/filterDismissedNotifications';

export const fetchGeneral = async (userId: string) => {
    const generalNotificationsQuery = createUserNotificationQuery();
    const generalNotifications = await fetchQueryResults<GeneralNotification>(
        generalNotificationsQuery,
    );
    const filteredGeneral = filterDismissedNotifications(
        generalNotifications,
        userId,
    );
    return filteredGeneral;
};
