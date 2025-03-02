import { firestoreApi } from '@/shared/api/firestoreApi';
import { executeQuery } from '@/shared/lib/firestore';
import {
    GeneralNotification,
    PersonalNotification,
} from '../model/types/notification';
import { ERROR_MESSAGES } from '../model/consts/errorMessages';
import { subscribeToNotifications } from '../lib/utilities/subscribeToNotifications/subscribeToNotifications';
import { dismissOneGeneral } from '../lib/utilities/handleNotificationsDelete/dismissOneGeneral/dismissOneGeneral';
import { deleteAllGeneral } from '../lib/utilities/handleNotificationsDelete/deleteAllGeneral/deleteAllGeneral';
import { dismissOnePersonal } from '../lib/utilities/handleNotificationsDelete/dismissOnePersonal/dismissOnePersonal';
import { deleteAllPersonal } from '../lib/utilities/handleNotificationsDelete/deleteAllPersonal/deleteAllPersonal';
import { fetchAllNotifications } from '../lib/utilities/getNotifications/fetchAllNotifications/fetchAllNotifications';

const notificationApi = firestoreApi
    .enhanceEndpoints({
        addTagTypes: ['Notifications', 'PersonalNotifications'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getAllNotifications: build.query<
                (GeneralNotification | PersonalNotification)[],
                string
            >({
                providesTags: ['Notifications', 'PersonalNotifications'],
                keepUnusedDataFor: 3600,
                async queryFn(userId: string) {
                    if (!userId) {
                        return {
                            error: new Error(
                                ERROR_MESSAGES.USER_NOT_AUTHORIZED,
                            ),
                        };
                    }

                    return executeQuery(
                        () => fetchAllNotifications(userId),
                        ERROR_MESSAGES.NOTIFICATIONS_FETCH_FAIL,
                    );
                },

                async onCacheEntryAdded(
                    userId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;

                    const unsubscribe = subscribeToNotifications(
                        updateCachedData,
                        userId,
                    );

                    if (unsubscribe) {
                        const { unsubscribeGeneral, unsubscribePersonal } =
                            unsubscribe;
                        await cacheEntryRemoved;
                        unsubscribeGeneral?.();
                        unsubscribePersonal?.();
                    }
                },
            }),
            markGeneralNotificationAsDismissed: build.mutation<
                void,
                { notificationId: string; userId: string }
            >({
                async queryFn({ notificationId, userId }) {
                    return executeQuery(
                        () => dismissOneGeneral(notificationId, userId),
                        ERROR_MESSAGES.DISMISS_GENERAL_FAIL(userId),
                    );
                },
                invalidatesTags: ['Notifications'],
            }),

            removeAllGeneralNotificationsForUser: build.mutation<
                void,
                { userId: string }
            >({
                async queryFn({ userId }) {
                    return executeQuery(
                        () => deleteAllGeneral(userId),
                        ERROR_MESSAGES.DELETE_ALL_GENERAL_FAIL,
                    );
                },
                invalidatesTags: ['Notifications'],
            }),

            markPersonalNotificationAsDismissed: build.mutation<
                void,
                { notificationId: string; userId: string }
            >({
                async queryFn({ notificationId, userId }) {
                    return executeQuery(
                        () => dismissOnePersonal(notificationId, userId),
                        ERROR_MESSAGES.DISMISS_PERSONAL_FAIL(userId),
                    );
                },
                invalidatesTags: ['PersonalNotifications'],
            }),
            removeAllPersonalNotifications: build.mutation<
                void,
                { userId: string }
            >({
                async queryFn({ userId }) {
                    return executeQuery(
                        () => deleteAllPersonal(userId),
                        ERROR_MESSAGES.DELETE_ALL_PERSONAL_FAIL,
                    );
                },
                invalidatesTags: ['PersonalNotifications'],
            }),
        }),
    });

export const useAllNotifications = notificationApi.useGetAllNotificationsQuery;
export const markGeneralNotificationAsDismissedMutation =
    notificationApi.endpoints.markGeneralNotificationAsDismissed.initiate;

export const markPersonalNotificationAsDismissedMutation =
    notificationApi.endpoints.markPersonalNotificationAsDismissed.initiate;

export const removeAllPersonalNotificationsMutation =
    notificationApi.endpoints.removeAllPersonalNotifications.initiate;

export const removeAllGeneralNotificationsForUserMutation =
    notificationApi.endpoints.removeAllGeneralNotificationsForUser.initiate;
