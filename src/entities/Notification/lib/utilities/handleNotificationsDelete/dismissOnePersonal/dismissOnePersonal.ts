import { deleteDoc } from 'firebase/firestore';
import { PersonalNotification } from '../../../../model/types/notification';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { ERROR_NOTIFICATION_MESSAGES } from '../../../../model/consts/errorNotificationMessages';

export const dismissOnePersonal = async (
    notificationId: string,
    userId: string,
) => {
    const notificationDocRef = await getDocRefByField<PersonalNotification>(
        `notifications/personal/${userId}`,
        'id',
        notificationId,
    );

    if (!notificationDocRef)
        throw new Error(
            ERROR_NOTIFICATION_MESSAGES.PERSONAL_NOTIFICATION_NOT_FOUND,
        );

    await deleteDoc(notificationDocRef);
};
