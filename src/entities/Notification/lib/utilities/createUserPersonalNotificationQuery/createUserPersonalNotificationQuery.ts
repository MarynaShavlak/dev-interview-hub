import { orderBy, query, Query } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { auth } from '../../../../../../json-server/firebase';
import { Notification } from '../../../model/types/notification';

export const createUserPersonalNotificationQuery = (): Query<Notification> => {
    const user = auth.currentUser;

    if (!user) {
        return query(dataPoint<Notification>('notifications/empty/collection'));
    }

    const personalNotificationsCollection = dataPoint<Notification>(
        `notifications/personal/${user.uid}`,
    );

    return query(personalNotificationsCollection, orderBy('timestamp', 'desc'));
};
