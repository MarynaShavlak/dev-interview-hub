import { deleteDoc } from 'firebase/firestore';
import { PersonalNotification } from '../../../../model/types/notification';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { ERROR_MESSAGES } from '../../../../model/consts/errorMessages';

export const dismissPersonalNotification = async (
    notificationId: string,
    userId: string,
) => {
    const notificationDocRef = await getDocRefByField<PersonalNotification>(
        `notifications/personal/${userId}`,
        'id',
        notificationId,
    );

    if (!notificationDocRef)
        throw new Error(ERROR_MESSAGES.PERSONAL_NOTIFICATION_NOT_FOUND);

    await deleteDoc(notificationDocRef);
};
