import {
    arrayUnion,
    deleteDoc,
    onSnapshot,
    updateDoc,
} from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/rtkApi';
import {
    GeneralNotification,
    PersonalNotification,
} from '../model/types/notification';

import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { createUserNotificationQuery } from '../lib/utilities/createUserNotificationsQuery/createUserNotificationsQuery';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { createUserPersonalNotificationQuery } from '../lib/utilities/createUserPersonalNotificationQuery/createUserPersonalNotificationQuery';
import { auth } from '../../../../json-server/firebase';
import { getTimestampMillis } from '../lib/utilities/getTimestampMillis/getTimestampMillis';

const notificationApi = firestoreApi
    .enhanceEndpoints({
        addTagTypes: ['Notifications', 'PersonalNotifications'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getNotifications: build.query<GeneralNotification[], void>({
                providesTags: ['Notifications'],
                keepUnusedDataFor: 3600,

                async queryFn() {
                    try {
                        const user = auth.currentUser;
                        if (!user) return { data: undefined };
                        const notificationsQuery =
                            createUserNotificationQuery();

                        const notifications =
                            await fetchQueryResults<GeneralNotification>(
                                notificationsQuery,
                            );
                        const filteredNotifications = notifications.filter(
                            (notification) =>
                                !notification.dismissedBy?.includes(user.uid),
                        );

                        return { data: filteredNotifications };
                    } catch (error) {
                        console.error('Error fetching notifications:', error);
                        return { error };
                    }
                },

                async onCacheEntryAdded(
                    _,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;
                    let unsubscribe;

                    try {
                        const user = auth.currentUser;
                        const notificationsQuery =
                            createUserNotificationQuery();

                        unsubscribe = onSnapshot(
                            notificationsQuery,
                            (snapshot) => {
                                updateCachedData((draft) => {
                                    const notifications = snapshot?.docs?.map(
                                        (doc) => doc.data(),
                                    ) as GeneralNotification[];

                                    return notifications.filter(
                                        (notification) =>
                                            !notification.dismissedBy?.includes(
                                                user?.uid || '',
                                            ),
                                    );
                                });
                            },
                        );
                    } catch (error) {
                        console.error(
                            'Error in notifications subscription:',
                            error,
                        );
                    }

                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
                },
            }),
            dismissNotification: build.mutation<
                void,
                { notificationId: string; userId: string }
            >({
                async queryFn({ notificationId, userId }) {
                    try {
                        const notificationDocRef =
                            await getDocRefByField<GeneralNotification>(
                                // 'notifications',
                                'notifications/general/messages',
                                'id',
                                notificationId,
                            );

                        if (!notificationDocRef) {
                            return { error: 'Notification not found' };
                        }

                        if (notificationDocRef) {
                            await updateDoc(notificationDocRef, {
                                dismissedBy: arrayUnion(userId),
                            });
                        }

                        return { data: undefined };
                    } catch (error) {
                        console.error('Error dismissing notification:', error);
                        return { error };
                    }
                },
                invalidatesTags: ['Notifications'],
            }),
            getPersonalNotifications: build.query<PersonalNotification[], void>(
                {
                    providesTags: ['PersonalNotifications'],
                    keepUnusedDataFor: 3600,

                    async queryFn() {
                        try {
                            const personalNotificationsQuery =
                                createUserPersonalNotificationQuery();

                            const notifications =
                                await fetchQueryResults<PersonalNotification>(
                                    personalNotificationsQuery,
                                );

                            return { data: notifications };
                        } catch (error) {
                            console.error(
                                'Error fetching personal notifications:',
                                error,
                            );
                            return { error };
                        }
                    },

                    async onCacheEntryAdded(
                        _,
                        {
                            updateCachedData,
                            cacheDataLoaded,
                            cacheEntryRemoved,
                        },
                    ) {
                        await cacheDataLoaded;
                        let unsubscribe;

                        try {
                            const personalNotificationsQuery =
                                createUserPersonalNotificationQuery();

                            unsubscribe = onSnapshot(
                                personalNotificationsQuery,
                                (snapshot) => {
                                    updateCachedData((draft) => {
                                        return snapshot?.docs?.map((doc) =>
                                            doc.data(),
                                        ) as PersonalNotification[];
                                    });
                                },
                            );
                        } catch (error) {
                            console.error(
                                'Error in personal notifications subscription:',
                                error,
                            );
                        }

                        await cacheEntryRemoved;
                        if (unsubscribe) {
                            unsubscribe();
                        }
                    },
                },
            ),
            dismissPersonalNotification: build.mutation<
                void,
                { notificationId: string; userId: string }
            >({
                async queryFn({ notificationId, userId }) {
                    try {
                        const notificationDocRef =
                            await getDocRefByField<PersonalNotification>(
                                `notifications/personal/${userId}`,
                                'id',
                                notificationId,
                            );

                        if (!notificationDocRef) {
                            return { error: 'Personal notification not found' };
                        }

                        if (notificationDocRef) {
                            await deleteDoc(notificationDocRef);
                        }

                        return { data: undefined };
                    } catch (error) {
                        console.error(
                            'Error dismissing personal notification:',
                            error,
                        );
                        return { error };
                    }
                },
                invalidatesTags: ['PersonalNotifications'],
            }),
            getAllNotifications: build.query<
                (GeneralNotification | PersonalNotification)[],
                void
            >({
                providesTags: ['Notifications', 'PersonalNotifications'],
                keepUnusedDataFor: 3600,
                async queryFn() {
                    try {
                        const user = auth.currentUser;
                        if (!user) return { data: undefined };

                        const generalNotificationsQuery =
                            createUserNotificationQuery();
                        const generalNotifications =
                            await fetchQueryResults<GeneralNotification>(
                                generalNotificationsQuery,
                            );
                        const filteredGeneral = generalNotifications.filter(
                            (notification) =>
                                !notification.dismissedBy?.includes(user.uid),
                        );

                        // Fetch personal notifications
                        const personalNotificationsQuery =
                            createUserPersonalNotificationQuery();
                        const personalNotifications =
                            await fetchQueryResults<PersonalNotification>(
                                personalNotificationsQuery,
                            );

                        // Merge and sort by timestamp (descending)
                        const allNotifications: (
                            | GeneralNotification
                            | PersonalNotification
                        )[] = [...filteredGeneral, ...personalNotifications];

                        const sortedNotifications: (
                            | GeneralNotification
                            | PersonalNotification
                        )[] = allNotifications.sort((a, b) => {
                            const timestampA = getTimestampMillis(a.timestamp);
                            const timestampB = getTimestampMillis(b.timestamp);
                            return timestampB - timestampA; // Descending order
                        });

                        return { data: sortedNotifications };
                    } catch (error) {
                        console.error(
                            'Error fetching all notifications:',
                            error,
                        );
                        return { error };
                    }
                },

                async onCacheEntryAdded(
                    _,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;
                    let unsubscribeGeneral;
                    let unsubscribePersonal;

                    try {
                        const user = auth.currentUser;
                        if (!user) return;

                        const generalNotificationsQuery =
                            createUserNotificationQuery();
                        const personalNotificationsQuery =
                            createUserPersonalNotificationQuery();

                        // Subscribe to general notifications
                        unsubscribeGeneral = onSnapshot(
                            generalNotificationsQuery,
                            (snapshot) => {
                                updateCachedData((draft) => {
                                    const general = snapshot.docs.map((doc) =>
                                        doc.data(),
                                    ) as GeneralNotification[];

                                    const filteredGeneral = general.filter(
                                        (notification) =>
                                            !notification.dismissedBy?.includes(
                                                user.uid,
                                            ),
                                    );

                                    // Merge general notifications with existing personal notifications
                                    const personal = draft.filter(
                                        (n) => n.type !== 'general',
                                    ); // Personal notifications from the cache
                                    console.log('personal', personal);
                                    const allNotifications = [
                                        ...filteredGeneral,
                                        ...personal,
                                    ];

                                    // De-duplicate based on `id`
                                    const uniqueNotifications =
                                        allNotifications.filter(
                                            (notification, index, self) =>
                                                index ===
                                                self.findIndex(
                                                    (n) =>
                                                        n.id ===
                                                        notification.id,
                                                ),
                                        );

                                    // Sort the notifications by timestamp (descending)
                                    return uniqueNotifications.sort((a, b) => {
                                        const timestampA = getTimestampMillis(
                                            a.timestamp,
                                        );
                                        const timestampB = getTimestampMillis(
                                            b.timestamp,
                                        );
                                        return timestampB - timestampA; // Descending order
                                    });
                                });
                            },
                        );

                        // Subscribe to personal notifications
                        unsubscribePersonal = onSnapshot(
                            personalNotificationsQuery,
                            (snapshot) => {
                                updateCachedData((draft) => {
                                    const personal = snapshot.docs.map((doc) =>
                                        doc.data(),
                                    ) as PersonalNotification[];

                                    // Merge personal notifications with existing general notifications
                                    const general = draft.filter(
                                        (n) => n.type === 'general',
                                    ); // General notifications from the cache

                                    const allNotifications = [
                                        ...general,
                                        ...personal,
                                    ];

                                    // De-duplicate based on `id`
                                    const uniqueNotifications =
                                        allNotifications.filter(
                                            (notification, index, self) =>
                                                index ===
                                                self.findIndex(
                                                    (n) =>
                                                        n.id ===
                                                        notification.id,
                                                ),
                                        );

                                    // Sort the notifications by timestamp (descending)
                                    return uniqueNotifications.sort((a, b) => {
                                        const timestampA = getTimestampMillis(
                                            a.timestamp,
                                        );
                                        const timestampB = getTimestampMillis(
                                            b.timestamp,
                                        );
                                        return timestampB - timestampA; // Descending order
                                    });
                                });
                            },
                        );
                    } catch (error) {
                        console.error(
                            'Error in all notifications subscription:',
                            error,
                        );
                    }

                    await cacheEntryRemoved;
                    if (unsubscribeGeneral) unsubscribeGeneral();
                    if (unsubscribePersonal) unsubscribePersonal();
                },
            }),
        }),
    });

export const useNotifications = notificationApi.useGetNotificationsQuery;
export const dismissNotificationMutation =
    notificationApi.endpoints.dismissNotification.initiate;
export const usePersonalNotifications =
    notificationApi.useGetPersonalNotificationsQuery;

export const dismissPersonalNotificationMutation =
    notificationApi.endpoints.dismissPersonalNotification.initiate;

export const useAllNotifications = notificationApi.useGetAllNotificationsQuery;
