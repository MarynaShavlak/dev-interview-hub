import { onSnapshot, query } from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';
import { fetchCollection } from '@/shared/lib/firestore/fetchCollection/fetchCollection';
import { dataPoint } from '@/shared/lib/firestore/firestore';

// const notificationApi = firestoreApi
//     .enhanceEndpoints({ addTagTypes: ['Notifications'] })
//     .injectEndpoints({
//         endpoints: (build) => ({
//             getNotifications: build.query<Notification[], void>({
//                 providesTags: ['Notifications'],
//                 keepUnusedDataFor: 3600,
//                 async queryFn() {
//                     try {
//                         const notifications =
//                             await fetchCollection<Notification>(
//                                 'notifications',
//                             );
//                         return { data: notifications };
//                     } catch (error) {
//                         console.error('Error fetching notifications:', error);
//                         return { error };
//                     }
//                 },
//                 async onCacheEntryAdded(
//                     _,
//                     { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
//                 ) {
//                     await cacheDataLoaded;
//                     let unsubscribe;
//                     try {
//                         const collectionRef =
//                             dataPoint<Notification>('notifications');
//                         const queryRef = query(collectionRef);
//                         unsubscribe = onSnapshot(queryRef, (snapshot) => {
//                             updateCachedData((draft) => {
//                                 const result = snapshot?.docs?.map((doc) =>
//                                     doc.data(),
//                                 ) as Notification[];
//                             });
//                         });
//                     } catch (error) {
//                         console.error('Error in notifications!', error);
//                     }
//
//                     await cacheEntryRemoved;
//                     if (unsubscribe) {
//                         unsubscribe();
//                     }
//                 },
//             }),
//         }),
//     });
//
// export const useNotifications = notificationApi.useGetNotificationsQuery;

// const notificationApi = rtkApi.injectEndpoints({
//     endpoints: (build) => ({
//         getNotifications: build.query<Notification[], null>({
//             query: () => ({
//                 url: '/notifications',
//             }),
//         }),
//     }),
// });

const notificationApi = firestoreApi
    .enhanceEndpoints({ addTagTypes: ['Notifications'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getNotifications: build.query<Notification[], void>({
                providesTags: ['Notifications'],
                keepUnusedDataFor: 3600,

                async queryFn() {
                    try {
                        const notifications =
                            await fetchCollection<Notification>(
                                'notifications',
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
                        const collectionRef =
                            dataPoint<Notification>('notifications');
                        const queryRef = query(collectionRef);

                        unsubscribe = onSnapshot(queryRef, (snapshot) => {
                            updateCachedData((draft) => {
                                // Convert snapshot to array of notifications
                                const notifications = snapshot.docs.map((doc) =>
                                    doc.data(),
                                ) as Notification[];

                                // Replace entire draft with new notifications
                                return notifications;
                            });
                        });
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
