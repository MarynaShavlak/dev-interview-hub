import { firestoreApi } from '@/shared/api/firestoreApi';

import {
    deleteDocFromFirestore,
    executeQuery,
    fetchCollectionForUser,
    handleFirestoreSubscription,
    saveDocToFirestore,
} from '@/shared/lib/firestore';

import { ERROR_LIVE_CODE_MESSAGES } from '../model/consts/errorHRInterviewMessages';
import { LiveCode } from '../model/types/liveCode';

import { fetchHRInterviewQA } from '../lib/utilities/fetchHRInterviewQA/fetchHRInterviewQA';
import { subscribeToHRInterviewQA } from '../lib/utilities/subscribeToHRInterviewQA/subscribeToHRInterviewQA';

import { subscribeToUserHRInterviews } from '../lib/utilities/subscribeToUserHRInterviews/subscribeToUserHRInterviews';
import { updateDocById } from '@/shared/lib/firestore/updateDocById/updateDocById';

interface UpdateHRInterviewQAArgs {
    id: string;
    updates: Partial<LiveCode>;
}
export type NewHRInterviewQADraft = Omit<LiveCode, 'createdAt'>;

export const liveCodeFirebaseApi = firestoreApi
    .enhanceEndpoints({
        addTagTypes: ['liveCodeTasks'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getHRInterviewQAsByUserId: build.query<LiveCode[], string>({
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
                        subscriptionFn: subscribeToUserHRInterviews,
                        updateFn: updateCachedData,
                        dependency: userId,
                        cacheDataLoaded,
                        cacheEntryRemoved,
                    });
                },
            }),
            getHRInterviewQADataById: build.query<LiveCode, string>({
                async queryFn(id) {
                    return executeQuery(
                        () => fetchHRInterviewQA(id),
                        ERROR_LIVE_CODE_MESSAGES.FETCH_LIVE_CODE_ERROR(id),
                    );
                },
                async onCacheEntryAdded(
                    id,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToHRInterviewQA,
                        updateFn: updateCachedData,
                        dependency: id,
                        cacheDataLoaded,
                        cacheEntryRemoved,
                    });
                },
            }),
            addHRInterviewQA: build.mutation<LiveCode, NewHRInterviewQADraft>({
                invalidatesTags: ['liveCodeTasks'],
                async queryFn(newHRInterviewQA) {
                    return executeQuery(
                        () =>
                            saveDocToFirestore<LiveCode>(
                                'liveCodeTasks',
                                newHRInterviewQA,
                                ERROR_LIVE_CODE_MESSAGES.LIVE_CODE_RETRIEVAL_FAIL,
                            ),
                        ERROR_LIVE_CODE_MESSAGES.ADD_LIVE_CODE_FAIL,
                    );
                },
            }),
            deleteHRInterviewQA: build.mutation<string, string>({
                invalidatesTags: ['liveCodeTasks'],
                async queryFn(id) {
                    return executeQuery(
                        () => deleteDocFromFirestore('liveCodeTasks', id),
                        ERROR_LIVE_CODE_MESSAGES.DELETE_LIVE_CODE_ERROR(id),
                    );
                },
            }),
            updateHRInterviewQA: build.mutation<
                LiveCode,
                UpdateHRInterviewQAArgs
            >({
                invalidatesTags: ['liveCodeTasks'],
                async queryFn({ id, updates }) {
                    return executeQuery(
                        async () => updateDocById('liveCodeTasks', id, updates),
                        ERROR_LIVE_CODE_MESSAGES.UPDATE_LIVE_CODE_ERROR(id),
                    );
                },
            }),
        }),
    });

const { endpoints } = liveCodeFirebaseApi;

export const addHRInterviewQAMutation = endpoints.addHRInterviewQA.initiate;
export const deleteHRInterviewQAMutation =
    endpoints.deleteHRInterviewQA.initiate;
export const updateHRInterviewQAMutation =
    endpoints.updateHRInterviewQA.initiate;
export const getHRInterviewQADataByIdQuery =
    endpoints.getHRInterviewQADataById.initiate;
export const useHRInterviewQAsByUserId =
    liveCodeFirebaseApi.useGetHRInterviewQAsByUserIdQuery;
