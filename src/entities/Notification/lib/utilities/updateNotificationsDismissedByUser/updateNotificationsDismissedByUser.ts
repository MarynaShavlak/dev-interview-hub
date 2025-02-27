import { GeneralNotification } from '../../../model/types/notification';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { deleteOneGeneralNotificationForUser } from '../deleteOneGeneralNotificationForUser/deleteOneGeneralNotificationForUser';

export const updateNotificationsDismissedByUser = async (
    notifications: GeneralNotification[],
    userId: string,
): Promise<void> => {
    const updatePromises = notifications.map(async (notification) => {
        const docRef = await getDocRefByField<GeneralNotification>(
            'notifications/general/messages',
            'id',
            notification.id,
        );

        if (docRef) {
            await deleteOneGeneralNotificationForUser(docRef, userId);
        }
        return null;
    });

    await Promise.allSettled(updatePromises);
};
