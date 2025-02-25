import { orderBy, query, Query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { auth } from '../../../../../../json-server/firebase';
import { Notification } from '../../../model/types/notification';

export const createUserNotificationQuery = (): Query<Notification> => {
    const user = auth.currentUser;
    const notificationsCollection = dataPoint<Notification>('notifications');
    if (!user) {
        return query(
            notificationsCollection,
            where('authorId', '!=', ''),
            orderBy('timestamp', 'desc'),
        );
    }

    return query(
        notificationsCollection,
        where('authorId', '!=', user.uid),
        where(`dismissedBy.${user.uid}`, '==', true),
        // orderBy('timestamp', 'desc'),
    );
};
