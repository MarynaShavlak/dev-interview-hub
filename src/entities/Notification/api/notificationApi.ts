import { onSnapshot } from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { createUserNotificationQuery } from '../lib/utilities/createUserNotificationsQuery/createUserNotificationsQuery';

const notificationApi = firestoreApi
    .enhanceEndpoints({ addTagTypes: ['Notifications'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getNotifications: build.query<Notification[], void>({
                providesTags: ['Notifications'],
                keepUnusedDataFor: 3600,

                async queryFn() {
                    try {
                        const notificationsQuery =
                            createUserNotificationQuery();

                        const notifications =
                            await fetchQueryResults<Notification>(
                                notificationsQuery,
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
                        const notificationsQuery =
                            createUserNotificationQuery();

                        unsubscribe = onSnapshot(
                            notificationsQuery,
                            (snapshot) => {
                                updateCachedData((draft) => {
                                    const notifications = snapshot?.docs?.map(
                                        (doc) => doc.data(),
                                    ) as Notification[];

                                    return notifications;
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
        }),
    });

export const useNotifications = notificationApi.useGetNotificationsQuery;

// async queryFn() {
//     try {
//         const notifications =
//             await fetchCollection<Notification>(
//                 'notifications',
//             );
//         return { data: notifications };
//     } catch (error) {
//         console.error('Error fetching notifications:', error);
//         return { error };
//     }
// },
//
// async onCacheEntryAdded(
//     _,
//     { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
// ) {
//     await cacheDataLoaded;
//     let unsubscribe;
//
//     try {
//         const collectionRef =
//             dataPoint<Notification>('notifications');
//         const queryRef = query(collectionRef);
//
//         unsubscribe = onSnapshot(queryRef, (snapshot) => {
//             updateCachedData((draft) => {
//                 const notifications = snapshot.docs.map((doc) =>
//                     doc.data(),
//                 ) as Notification[];
//
//                 return notifications;
//             });
//         });
//     } catch (error) {
//         console.error(
//             'Error in notifications subscription:',
//             error,
//         );
//     }
//
//     await cacheEntryRemoved;
//     if (unsubscribe) {
//         unsubscribe();
//     }
// },
