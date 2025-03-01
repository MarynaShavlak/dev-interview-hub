import { firestoreApi } from '@/shared/api/firestoreApi';
import {
    GeneralNotification,
    PersonalNotification,
} from '../model/types/notification';

import { subscribeToNotifications } from '../lib/utilities/subscribeToNotifications/subscribeToNotifications';
import { ERROR_MESSAGES } from '../model/consts/errorMessages';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { dismissOneGeneral } from '../lib/utilities/handleNotificationsDelete/dismissOneGeneral/dismissOneGeneral';
import { deleteAllGeneral } from '../lib/utilities/handleNotificationsDelete/deleteAllGeneral/deleteAllGeneral';
import { dismissOnePersonal } from '../lib/utilities/handleNotificationsDelete/dismissOnePersonal/dismissOnePersonal';
import { deleteAllPersonal } from '../lib/utilities/handleNotificationsDelete/deleteAllPersonal/deleteAllPersonal';
import { executeQuery } from '@/shared/lib/firestore/executeQuery/executeQuery';
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
                    // try {
                    //     if (!userId) {
                    //         return {
                    //             error: new Error(
                    //                 ERROR_MESSAGES.USER_NOT_AUTHORIZED,
                    //             ),
                    //         };
                    //     }
                    //     const data = await fetchAllNotifications(userId);
                    //     return { data };
                    // } catch (error) {
                    //     return handleRequestErrorMessage(
                    //         ERROR_MESSAGES.NOTIFICATIONS_FETCH_FAIL,
                    //         error,
                    //     );
                    // }

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
                    try {
                        await dismissOneGeneral(notificationId, userId);

                        return { data: undefined };
                    } catch (error) {
                        return handleRequestErrorMessage(
                            ERROR_MESSAGES.DISMISS_GENERAL_FAIL(userId),
                            error,
                        );
                    }
                },
                invalidatesTags: ['Notifications'],
            }),

            removeAllGeneralNotificationsForUser: build.mutation<
                void,
                { userId: string }
            >({
                async queryFn({ userId }) {
                    try {
                        await deleteAllGeneral(userId);
                        return { data: undefined };
                    } catch (error) {
                        return handleRequestErrorMessage(
                            ERROR_MESSAGES.DELETE_ALL_GENERAL_FAIL,
                            error,
                        );
                    }
                },
                invalidatesTags: ['Notifications'],
            }),

            markPersonalNotificationAsDismissed: build.mutation<
                void,
                { notificationId: string; userId: string }
            >({
                async queryFn({ notificationId, userId }) {
                    try {
                        await dismissOnePersonal(notificationId, userId);
                        return { data: undefined };
                    } catch (error) {
                        return handleRequestErrorMessage(
                            ERROR_MESSAGES.DISMISS_PERSONAL_FAIL(userId),
                            error,
                        );
                    }
                },
                invalidatesTags: ['PersonalNotifications'],
            }),
            removeAllPersonalNotifications: build.mutation<
                void,
                { userId: string }
            >({
                async queryFn({ userId }) {
                    try {
                        await deleteAllPersonal(userId);
                        return { data: undefined };
                    } catch (error) {
                        return handleRequestErrorMessage(
                            ERROR_MESSAGES.DELETE_ALL_PERSONAL_FAIL,
                            error,
                        );
                    }
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
