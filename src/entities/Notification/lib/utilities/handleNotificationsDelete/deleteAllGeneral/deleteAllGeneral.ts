import { fetchCollectionDocsData } from '@/shared/lib/firestore/fetchCollectionDocsData/fetchCollectionDocsData';
import { GeneralNotification } from '../../../../model/types/notification';
import { filterDismissedNotifications } from '../../getNotifications/filterDismissedNotifications/filterDismissedNotifications';
import { updateNotificationsDismissedByUser } from '../../updateNotificationsDismissedByUser/updateNotificationsDismissedByUser';

export const deleteAllGeneral = async (userId: string) => {
    const allGeneralNotifications =
        await fetchCollectionDocsData<GeneralNotification>(
            'notifications/general/messages',
        );

    const notificationsToUpdate = filterDismissedNotifications(
        allGeneralNotifications,
        userId,
    );

    if (notificationsToUpdate.length === 0) return;

    await updateNotificationsDismissedByUser(notificationsToUpdate, userId);
};
