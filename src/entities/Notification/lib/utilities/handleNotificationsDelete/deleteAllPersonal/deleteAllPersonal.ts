import { deleteAllPersonalNotificationDocsForUser } from '../../deleteAllPersonalNotificationDocsForUser/deleteAllPersonalNotificationDocsForUser';
import { PersonalNotification } from '../../../../model/types/notification';
import { fetchCollectionDocs } from '@/shared/lib/firestore/fetchCollectionDocs/fetchCollectionDocs';

export const deleteAllPersonal = async (userId: string) => {
    const notificationDocs = await fetchCollectionDocs<PersonalNotification>(
        `notifications/personal/${userId}`,
    );
    if (notificationDocs.empty) return;

    await deleteAllPersonalNotificationDocsForUser(notificationDocs);
};
