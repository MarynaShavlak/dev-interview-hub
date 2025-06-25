import { firestoreApi } from '@/shared/api/firestoreApi';

import {
    deleteDocFromFirestore,
    executeQuery,
    fetchCollectionForUser,
    handleFirestoreSubscription,
    saveDocToFirestore,
} from '@/shared/lib/firestore';

import { LiveCode } from '../model/types/liveCode';

import { fetchLiveCode } from '../lib/utilities/fetchLiveCode/fetchLiveCode';
import { subscribeToLiveCode } from '../lib/utilities/subscribeToLiveCode/subscribeToLiveCode';

import { subscribeToUserLiveCodeTasks } from '../lib/utilities/subscribeToUserLiveCodeTasks/subscribeToUserLiveCodeTasks';
import { updateDocById } from '@/shared/lib/firestore/updateDocById/updateDocById';
import { ERROR_LIVE_CODE_MESSAGES } from '../model/consts/errorLiveCodeMessages';

interface UpdateLiveCodeArgs {
    id: string;
    updates: Partial<LiveCode>;
}
export type NewLiveCodeDraft = Omit<LiveCode, 'createdAt'>;

export const liveCodeFirebaseApi = firestoreApi
    .enhanceEndpoints({
        addTagTypes: ['liveCodeTasks'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getLiveCodesByUserId: build.query<LiveCode[], string>({
                providesTags: [{ type: 'liveCodeTasks', id: 'userId' }],
                keepUnusedDataFor: 3600,
                async queryFn(userId) {
                    if (!userId) {
                        return {
                            error: new Error(
                                ERROR_LIVE_CODE_MESSAGES.USER_NOT_FOUND,
                            ),
                        };
                    }
                    return executeQuery(
                        () =>
                            fetchCollectionForUser<LiveCode>(
                                'liveCodeTasks',
                                userId,
                            ),
                        ERROR_LIVE_CODE_MESSAGES.LIVE_CODES_BY_USER_ID_FETCH_FAIL(
                            userId,
                        ),
                    );
                },
                async onCacheEntryAdded(
                    userId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToUserLiveCodeTasks,
                        updateFn: updateCachedData,
                        dependency: userId,
                        cacheDataLoaded,
                        cacheEntryRemoved,
                    });
                },
            }),
            getLiveCodeDataById: build.query<LiveCode, string>({
                async queryFn(id) {
                    return executeQuery(
                        () => fetchLiveCode(id),
                        ERROR_LIVE_CODE_MESSAGES.FETCH_LIVE_CODE_ERROR(id),
                    );
                },
                async onCacheEntryAdded(
                    id,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToLiveCode,
                        updateFn: updateCachedData,
                        dependency: id,
                        cacheDataLoaded,
                        cacheEntryRemoved,
                    });
                },
            }),
            addLiveCode: build.mutation<LiveCode, NewLiveCodeDraft>({
                invalidatesTags: ['liveCodeTasks'],
                async queryFn(newLiveCode) {
                    return executeQuery(
                        () =>
                            saveDocToFirestore<LiveCode>(
                                'liveCodeTasks',
                                newLiveCode,
                                ERROR_LIVE_CODE_MESSAGES.LIVE_CODE_RETRIEVAL_FAIL,
                            ),
                        ERROR_LIVE_CODE_MESSAGES.ADD_LIVE_CODE_FAIL,
                    );
                },
            }),
            deleteLiveCode: build.mutation<string, string>({
                invalidatesTags: ['liveCodeTasks'],
                async queryFn(id) {
                    return executeQuery(
                        () => deleteDocFromFirestore('liveCodeTasks', id),
                        ERROR_LIVE_CODE_MESSAGES.DELETE_LIVE_CODE_ERROR(id),
                    );
                },
            }),
            updateLiveCode: build.mutation<LiveCode, UpdateLiveCodeArgs>({
                invalidatesTags: ['liveCodeTasks'],
                async queryFn({ id, updates }) {
                    return executeQuery(
                        async () => updateDocById('liveCodeTasks', id, updates),
                        ERROR_LIVE_CODE_MESSAGES.UPDATE_LIVE_CODE_ERROR(id),
                    );
                },
            }),
            getLiveCodeCategoryCounts: build.query<
                Record<string, number>,
                string
            >({
                providesTags: ['liveCodeTasks'],
                async queryFn(userId) {
                    if (!userId) {
                        return {
                            error: new Error(
                                ERROR_LIVE_CODE_MESSAGES.USER_NOT_FOUND,
                            ),
                        };
                    }

                    try {
                        // Get all documents for the user
                        const querySnapshot =
                            await fetchCollectionForUser<LiveCode>(
                                'liveCodeTasks',
                                userId,
                            );

                        // Count categories
                        const categoryCounts: Record<string, number> = {};
                        querySnapshot.forEach((doc) => {
                            const { category } = doc;
                            if (category) {
                                if (!categoryCounts[category]) {
                                    categoryCounts[category] = 0;
                                }
                                categoryCounts[category] += 1;
                            }
                        });

                        return { data: categoryCounts };
                    } catch (error) {
                        return {
                            error: new Error(
                                ERROR_LIVE_CODE_MESSAGES.LIVE_CODES_BY_USER_ID_FETCH_FAIL(
                                    userId,
                                ),
                            ),
                        };
                    }
                },
            }),
        }),
    });

const { endpoints } = liveCodeFirebaseApi;

export const addLiveCodeMutation = endpoints.addLiveCode.initiate;
export const deleteLiveCodeMutation = endpoints.deleteLiveCode.initiate;
export const updateLiveCodeMutation = endpoints.updateLiveCode.initiate;
export const getLiveCodeDataByIdQuery = endpoints.getLiveCodeDataById.initiate;
export const useLiveCodesByUserId =
    liveCodeFirebaseApi.useGetLiveCodesByUserIdQuery;
export const useLiveCodeDataById =
    liveCodeFirebaseApi.useGetLiveCodeDataByIdQuery;
export const getLiveCodeTask = endpoints.getLiveCodeDataById;
export const useLiveCodeCategoryCounts =
    liveCodeFirebaseApi.useGetLiveCodeCategoryCountsQuery;
