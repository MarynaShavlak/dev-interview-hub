import { firestoreApi } from '@/shared/api/rtkApi';
import {
    GeneralNotification,
    PersonalNotification,
} from '../model/types/notification';

import { auth } from '../../../../json-server/firebase';
import { fetchAllNotifications } from '../lib/utilities/fetchAllNotifications/fetchAllNotifications';
import { subscribeToNotifications } from '../lib/utilities/subscribeToNotifications/subscribeToNotifications';
import { ERROR_MESSAGES } from '../model/consts/errorMessages';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { dismissGeneralNotification } from '../lib/utilities/handleNotificationsDelete/dismissGeneralNotification/dismissGeneralNotification';
import { deleteAllGeneralNotifications } from '../lib/utilities/handleNotificationsDelete/deleteAllGeneralNotifications/deleteAllGeneralNotifications';
import { dismissPersonalNotification } from '../lib/utilities/handleNotificationsDelete/dismissPersonalNotification/dismissPersonalNotification';
import { deleteAllPersonalNotifications } from '../lib/utilities/handleNotificationsDelete/deleteAllPersonalNotifications/deleteAllPersonalNotifications';

const notificationApi = firestoreApi
    .enhanceEndpoints({
        addTagTypes: ['Notifications', 'PersonalNotifications'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getAllNotifications: build.query<
                (GeneralNotification | PersonalNotification)[],
                void
            >({
                providesTags: ['Notifications', 'PersonalNotifications'],
                keepUnusedDataFor: 3600,
                async queryFn() {
                    try {
                        const user = auth.currentUser;
                        if (!user) {
                            const error = new Error(
                                ERROR_MESSAGES.USER_NOT_AUTHORIZED,
                            );
                            return { error };
                        }
                        const data = await fetchAllNotifications(user.uid);
                        return { data };
                    } catch (error) {
                        return handleRequestErrorMessage(
                            ERROR_MESSAGES.NOTIFICATIONS_FETCH_FAIL,
                            error,
                        );
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
            dismissGeneralNotification: build.mutation<
                void,
                { notificationId: string; userId: string }
            >({
                async queryFn({ notificationId, userId }) {
                    try {
                        await dismissGeneralNotification(
                            notificationId,
                            userId,
                        );

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

            deleteAllGeneralNotificationsForUser: build.mutation<
                void,
                { userId: string }
            >({
                async queryFn({ userId }) {
                    try {
                        await deleteAllGeneralNotifications(userId);
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

            dismissPersonalNotification: build.mutation<
                void,
                { notificationId: string; userId: string }
            >({
                async queryFn({ notificationId, userId }) {
                    try {
                        await dismissPersonalNotification(
                            notificationId,
                            userId,
                        );
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
            deleteAllPersonalNotifications: build.mutation<
                void,
                { userId: string }
            >({
                async queryFn({ userId }) {
                    try {
                        await deleteAllPersonalNotifications(userId);
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
export const dismissGeneralNotificationMutation =
    notificationApi.endpoints.dismissGeneralNotification.initiate;

export const dismissPersonalNotificationMutation =
    notificationApi.endpoints.dismissPersonalNotification.initiate;

export const deleteAllPersonalNotificationsMutation =
    notificationApi.endpoints.deleteAllPersonalNotifications.initiate;

export const deleteAllGeneralNotificationsForUserMutation =
    notificationApi.endpoints.deleteAllGeneralNotificationsForUser.initiate;
