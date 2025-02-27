import { deleteAllPersonalNotificationDocsForUser } from '../../deleteAllPersonalNotificationDocsForUser/deleteAllPersonalNotificationDocsForUser';
import { PersonalNotification } from '../../../../model/types/notification';
import { fetchCollectionDocs } from '@/shared/lib/firestore/fetchCollectionDocs/fetchCollectionDocs';
import { ERROR_MESSAGES } from '../../../../model/consts/errorMessages';

export const deleteAllPersonalNotifications = async (userId: string) => {
    const notificationDocs = await fetchCollectionDocs<PersonalNotification>(
        `notifications/personal/${userId}`,
    );
    if (notificationDocs.empty)
        throw new Error(ERROR_MESSAGES.NO_PERSONAL_NOTIFICATIONS);

    await deleteAllPersonalNotificationDocsForUser(notificationDocs);
};
