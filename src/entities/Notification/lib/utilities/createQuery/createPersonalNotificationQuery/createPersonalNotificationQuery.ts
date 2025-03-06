import { orderBy, query, Query } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { PersonalNotification } from '../../../../model/types/notification';

export const createPersonalNotificationQuery = (
    userId: string,
): Query<PersonalNotification> => {
    // const user = auth.currentUser;

    if (!userId) {
        return query(
            dataPoint<PersonalNotification>('notifications/empty/collection'),
        );
    }

    const personalNotificationsCollection = dataPoint<PersonalNotification>(
        `notifications/personal/${userId}`,
    );

    return query(personalNotificationsCollection, orderBy('timestamp', 'desc'));
};
