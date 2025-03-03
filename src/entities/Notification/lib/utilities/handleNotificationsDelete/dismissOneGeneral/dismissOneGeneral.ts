import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { GeneralNotification } from '../../../../model/types/notification';
import { deleteOneGeneralNotificationForUser } from '../../deleteOneGeneralNotificationForUser/deleteOneGeneralNotificationForUser';
import { ERROR_NOTIFICATION_MESSAGES } from '../../../../model/consts/errorNotificationMessages';

export const dismissOneGeneral = async (
    notificationId: string,
    userId: string,
) => {
    const notificationDocRef = await getDocRefByField<GeneralNotification>(
        'notifications/general/messages',
        'id',
        notificationId,
    );

    if (!notificationDocRef)
        throw new Error(ERROR_NOTIFICATION_MESSAGES.NOTIFICATION_NOT_FOUND);

    await deleteOneGeneralNotificationForUser(notificationDocRef, userId);
};
