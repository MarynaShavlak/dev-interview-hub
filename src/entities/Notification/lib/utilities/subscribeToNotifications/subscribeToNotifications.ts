import { onSnapshot } from 'firebase/firestore';
import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { createUserNotificationQuery } from '../createQuery/createGeneralNotificationsQuery/createGeneralNotificationsQuery';
import { createPersonalNotificationQuery } from '../createQuery/createPersonalNotificationQuery/createPersonalNotificationQuery';
import { filterDismissedNotifications } from '../getNotifications/filterDismissedNotifications/filterDismissedNotifications';
import { getPreviousPersonal } from '../getNotifications/getPreviousPersonal/getPreviousPersonal';
import { getAllCachedSorted } from '../getNotifications/getAllCachedSorted/getAllCachedSorted';
import { getPreviousGeneral } from '../getNotifications/getPreviousGeneral/getPreviousGeneral';
import {
    GeneralNotification,
    PersonalNotification,
} from '../../../model/types/notification';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { ERROR_NOTIFICATION_MESSAGES } from '../../../model/consts/errorNotificationMessages';

export const subscribeToNotifications = (
    updateCachedData: (
        updater: (
            draft: MaybeDrafted<(PersonalNotification | GeneralNotification)[]>,
        ) => void,
    ) => void,
    userId: string,
) => {
    let unsubscribeGeneral: (() => void) | undefined;
    let unsubscribePersonal: (() => void) | undefined;

    try {
        if (!userId) return undefined;

        const generalNotificationsQuery = createUserNotificationQuery();
        const personalNotificationsQuery = createPersonalNotificationQuery();

        unsubscribeGeneral = onSnapshot(
            generalNotificationsQuery,
            (snapshot) => {
                updateCachedData((draft) => {
                    const general = snapshot.docs.map((doc) =>
                        doc.data(),
                    ) as GeneralNotification[];
                    const filteredGeneral = filterDismissedNotifications(
                        general,
                        userId,
                    );
                    const previousPersonal = getPreviousPersonal(draft);
                    return getAllCachedSorted(
                        filteredGeneral,
                        previousPersonal,
                    );
                });
            },
        );

        unsubscribePersonal = onSnapshot(
            personalNotificationsQuery,
            (snapshot) => {
                updateCachedData((draft) => {
                    const personal = snapshot.docs.map((doc) =>
                        doc.data(),
                    ) as PersonalNotification[];
                    const previousGeneral = getPreviousGeneral(draft);
                    return getAllCachedSorted(previousGeneral, personal);
                });
            },
        );
    } catch (error) {
        handleRequestErrorMessage(
            ERROR_NOTIFICATION_MESSAGES.SUBSCRIPTIONS_ERROR,
            error,
        );
    }

    return { unsubscribeGeneral, unsubscribePersonal };
};
