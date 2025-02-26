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

import { createUserNotificationQuery } from '../lib/utilities/createUserNotificationsQuery/createUserNotificationsQuery';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { createUserPersonalNotificationQuery } from '../lib/utilities/createUserPersonalNotificationQuery/createUserPersonalNotificationQuery';
import { auth } from '../../../../json-server/firebase';
import { fetchPersonalNotifications } from '../lib/utilities/fetchPersonalNotifications/fetchPersonalNotifications';
import { fetchGeneralNotifications } from '../lib/utilities/fetchGeneralNotifications/fetchGeneralNotifications';
import { filterDismissedNotifications } from '../lib/utilities/filterDismissedNotifications/filterDismissedNotifications';
import { fetchAllNotifications } from '../lib/utilities/fetchAllNotifications/fetchAllNotifications';
import { subscribeToNotifications } from '../lib/utilities/subscribeToNotifications/subscribeToNotifications';

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

                        const notifications = await fetchGeneralNotifications(
                            user.uid,
                        );

                        return { data: notifications };
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

                                    return filterDismissedNotifications(
                                        notifications,
                                        user?.uid || '',
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
                            const notifications =
                                await fetchPersonalNotifications();

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
                        const data = await fetchAllNotifications(user.uid);
                        return { data };
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

                    const user = auth.currentUser;
                    if (!user) return;

                    const unsubscribe = subscribeToNotifications(
                        updateCachedData,
                        user.uid,
                    );

                    if (unsubscribe) {
                        const { unsubscribeGeneral, unsubscribePersonal } =
                            unsubscribe;
                        await cacheEntryRemoved;
                        if (unsubscribeGeneral) unsubscribeGeneral();
                        if (unsubscribePersonal) unsubscribePersonal();
                    }
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
