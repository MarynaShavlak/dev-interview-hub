import { orderBy, query, Query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { auth } from '../../../../../../json-server/firebase';
import { GeneralNotification } from '../../../model/types/notification';

export const createUserNotificationQuery = (): Query<GeneralNotification> => {
    const user = auth.currentUser;
    // const notificationsCollection = dataPoint<GeneralNotification>('notifications');
    const notificationsCollection = dataPoint<GeneralNotification>(
        'notifications/general/messages',
    );
    if (!user) {
        return query(notificationsCollection, where('authorId', '!=', ''));
    }

    return query(
        notificationsCollection,
        where('authorId', '!=', user.uid),
        orderBy('timestamp', 'desc'),
    );
};
