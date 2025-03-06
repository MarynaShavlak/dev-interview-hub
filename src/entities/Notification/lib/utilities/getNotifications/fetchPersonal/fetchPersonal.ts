import { createPersonalNotificationQuery } from '../../createQuery/createPersonalNotificationQuery/createPersonalNotificationQuery';
import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { PersonalNotification } from '../../../../model/types/notification';

export const fetchPersonal = async (userId: string) => {
    const personalNotificationsQuery = createPersonalNotificationQuery(userId);
    const personalNotifications = await fetchQueryResults<PersonalNotification>(
        personalNotificationsQuery,
    );
    return personalNotifications;
};
