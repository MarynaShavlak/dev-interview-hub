import { onSnapshot } from 'firebase/firestore';
import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { createUserNotificationQuery } from '../createUserNotificationsQuery/createUserNotificationsQuery';
import { createUserPersonalNotificationQuery } from '../createUserPersonalNotificationQuery/createUserPersonalNotificationQuery';
import { filterDismissedNotifications } from '../filterDismissedNotifications/filterDismissedNotifications';
import { getPreviousPersonalNotifications } from '../getPreviousPersonalNotifications/getPreviousPersonalNotifications';
import { getAllCachedSortedNotifications } from '../getAllCachedSortedNotifications/getAllCachedSortedNotifications';
import { getPreviousGeneralNotifications } from '../getPreviousGeneralNotifications/getPreviousGeneralNotifications';
import {
    GeneralNotification,
    PersonalNotification,
} from '../../../model/types/notification';

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
        const personalNotificationsQuery =
            createUserPersonalNotificationQuery();

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
                    const previousPersonal =
                        getPreviousPersonalNotifications(draft);
                    return getAllCachedSortedNotifications(
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
                    const previousGeneral =
                        getPreviousGeneralNotifications(draft);
                    return getAllCachedSortedNotifications(
                        previousGeneral,
                        personal,
                    );
                });
            },
        );
    } catch (error) {
        console.error('Error in all notifications subscription:', error);
    }

    return { unsubscribeGeneral, unsubscribePersonal };
};
