import { orderBy, query, Query } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { auth } from '../../../../../../json-server/firebase';
import { PersonalNotification } from '../../../model/types/notification';

export const createUserPersonalNotificationQuery =
    (): Query<PersonalNotification> => {
        const user = auth.currentUser;

        if (!user) {
            return query(
                dataPoint<PersonalNotification>(
                    'notifications/empty/collection',
                ),
            );
        }

        const personalNotificationsCollection = dataPoint<PersonalNotification>(
            `notifications/personal/${user.uid}`,
        );

        return query(
            personalNotificationsCollection,
            orderBy('timestamp', 'desc'),
        );
    };
