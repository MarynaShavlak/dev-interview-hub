import { createUserPersonalNotificationQuery } from '../createUserPersonalNotificationQuery/createUserPersonalNotificationQuery';
import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { PersonalNotification } from '../../../model/types/notification';

export const fetchPersonalNotifications = async () => {
    const personalNotificationsQuery = createUserPersonalNotificationQuery();
    const personalNotifications = await fetchQueryResults<PersonalNotification>(
        personalNotificationsQuery,
    );
    return personalNotifications;
};
