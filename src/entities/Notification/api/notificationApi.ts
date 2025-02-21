import { firestoreApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';
import { fetchCollection } from '@/shared/lib/firestore/fetchCollection/fetchCollection';

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
            }),
        }),
    });

export const useNotifications = notificationApi.useGetNotificationsQuery;

// const notificationApi = rtkApi.injectEndpoints({
//     endpoints: (build) => ({
//         getNotifications: build.query<Notification[], null>({
//             query: () => ({
//                 url: '/notifications',
//             }),
//         }),
//     }),
// });
