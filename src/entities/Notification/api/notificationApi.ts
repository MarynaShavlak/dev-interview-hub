import { deleteDoc } from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/rtkApi';
import {
    GeneralNotification,
    PersonalNotification,
} from '../model/types/notification';

import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { auth } from '../../../../json-server/firebase';
import { fetchAllNotifications } from '../lib/utilities/fetchAllNotifications/fetchAllNotifications';
import { subscribeToNotifications } from '../lib/utilities/subscribeToNotifications/subscribeToNotifications';
import { fetchCollectionDocsData } from '@/shared/lib/firestore/fetchCollectionDocsData/fetchCollectionDocsData';
import { filterDismissedNotifications } from '../lib/utilities/filterDismissedNotifications/filterDismissedNotifications';
import { deleteOneGeneralNotificationForUser } from '../lib/utilities/deleteOneGeneralNotificationForUser/deleteOneGeneralNotificationForUser';
import { updateNotificationsDismissedByUser } from '../lib/utilities/updateNotificationsDismissedByUser/updateNotificationsDismissedByUser';
import { ERROR_MESSAGES } from '../model/consts/errorMessages';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { fetchCollectionDocs } from '@/shared/lib/firestore/fetchCollectionDocs/fetchCollectionDocs';
import { deleteAllPersonalNotificationDocsForUser } from '../lib/utilities/deleteAllPersonalNotificationDocsForUser/deleteAllPersonalNotificationDocsForUser';

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
                        const notificationDocRef =
                            await getDocRefByField<GeneralNotification>(
                                'notifications/general/messages',
                                'id',
                                notificationId,
                            );

                        if (!notificationDocRef) {
                            return { error: 'Notification not found' };
                        }

                        if (notificationDocRef) {
                            await deleteOneGeneralNotificationForUser(
                                notificationDocRef,
                                userId,
                            );
                        }

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
                        const allGeneralNotifications =
                            await fetchCollectionDocsData<GeneralNotification>(
                                'notifications/general/messages',
                            );

                        const notificationsToUpdate =
                            filterDismissedNotifications(
                                allGeneralNotifications,
                                userId,
                            );

                        if (notificationsToUpdate.length === 0) {
                            return { data: undefined };
                        }

                        await updateNotificationsDismissedByUser(
                            notificationsToUpdate,
                            userId,
                        );

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
                        const notificationDocRef =
                            await getDocRefByField<PersonalNotification>(
                                `notifications/personal/${userId}`,
                                'id',
                                notificationId,
                            );

                        if (!notificationDocRef) {
                            return handleRequestErrorMessage(
                                ERROR_MESSAGES.PERSONAL_NOTIFICATION_NOT_FOUND,
                            );
                        }

                        if (notificationDocRef) {
                            await deleteDoc(notificationDocRef);
                        }

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
                        const notificationDocs =
                            await fetchCollectionDocs<PersonalNotification>(
                                `notifications/personal/${userId}`,
                            );

                        if (notificationDocs.empty) {
                            return {
                                error: 'No personal notifications found for the user.',
                            };
                        }

                        await deleteAllPersonalNotificationDocsForUser(
                            notificationDocs,
                        );

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
