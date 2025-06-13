import { firestoreApi } from '@/shared/api/firestoreApi';

import {
    deleteDocFromFirestore,
    executeQuery,
    fetchCollectionForUser,
    handleFirestoreSubscription,
    saveDocToFirestore,
} from '@/shared/lib/firestore';

import { ERROR_HR_INTERVIEW_MESSAGES } from '../model/consts/errorHRInterviewMessages';
import { HRInterviewQA } from '../model/types/hrInterviewQA';

import { fetchHRInterviewQA } from '../lib/utilities/fetchHRInterviewQA/fetchHRInterviewQA';
import { subscribeToHRInterviewQA } from '../lib/utilities/subscribeToHRInterviewQA/subscribeToHRInterviewQA';

import { subscribeToUserHRInterviews } from '../lib/utilities/subscribeToUserHRInterviews/subscribeToUserHRInterviews';
import { updateDocById } from '@/shared/lib/firestore/updateDocById/updateDocById';

interface UpdateHRInterviewQAArgs {
    id: string;
    updates: Partial<HRInterviewQA>;
}
export type NewHRInterviewQADraft = Omit<HRInterviewQA, 'createdAt'>;

export const HRInterviewQAFirebaseApi = firestoreApi
    .enhanceEndpoints({
        addTagTypes: ['HRInterviewQAs'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getHRInterviewQAsByUserId: build.query<HRInterviewQA[], string>({
                providesTags: [{ type: 'HRInterviewQAs', id: 'userId' }],
                keepUnusedDataFor: 3600,
                async queryFn(userId) {
                    if (!userId) {
                        return {
                            error: new Error(
                                ERROR_HR_INTERVIEW_MESSAGES.USER_NOT_FOUND,
                            ),
                        };
                    }
                    return executeQuery(
                        () =>
                            fetchCollectionForUser<HRInterviewQA>(
                                'hrInterviewQA',
                                userId,
                            ),
                        ERROR_HR_INTERVIEW_MESSAGES.HR_INTERVIEWS_BY_USER_ID_FETCH_FAIL(
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
            getHRInterviewQADataById: build.query<HRInterviewQA, string>({
                async queryFn(id) {
                    return executeQuery(
                        () => fetchHRInterviewQA(id),
                        ERROR_HR_INTERVIEW_MESSAGES.FETCH_HR_INTERVIEW_ERROR(
                            id,
                        ),
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
            addHRInterviewQA: build.mutation<
                HRInterviewQA,
                NewHRInterviewQADraft
            >({
                invalidatesTags: ['HRInterviewQAs'],
                async queryFn(newHRInterviewQA) {
                    return executeQuery(
                        () =>
                            saveDocToFirestore<HRInterviewQA>(
                                'hrInterviewQA',
                                newHRInterviewQA,
                                ERROR_HR_INTERVIEW_MESSAGES.HR_INTERVIEW_RETRIEVAL_FAIL,
                            ),
                        ERROR_HR_INTERVIEW_MESSAGES.ADD_HR_INTERVIEW_FAIL,
                    );
                },
            }),
            deleteHRInterviewQA: build.mutation<string, string>({
                invalidatesTags: ['HRInterviewQAs'],
                async queryFn(id) {
                    return executeQuery(
                        () => deleteDocFromFirestore('hrInterviewQA', id),
                        ERROR_HR_INTERVIEW_MESSAGES.DELETE_HR_INTERVIEW_ERROR(
                            id,
                        ),
                    );
                },
            }),
            updateHRInterviewQA: build.mutation<
                HRInterviewQA,
                UpdateHRInterviewQAArgs
            >({
                invalidatesTags: ['HRInterviewQAs'],
                async queryFn({ id, updates }) {
                    return executeQuery(
                        async () => updateDocById('hrInterviewQA', id, updates),
                        ERROR_HR_INTERVIEW_MESSAGES.UPDATE_HR_INTERVIEW_ERROR(
                            id,
                        ),
                    );
                },
            }),
        }),
    });

const { endpoints } = HRInterviewQAFirebaseApi;

export const addHRInterviewQAMutation = endpoints.addHRInterviewQA.initiate;
export const deleteHRInterviewQAMutation =
    endpoints.deleteHRInterviewQA.initiate;
export const updateHRInterviewQAMutation =
    endpoints.updateHRInterviewQA.initiate;
export const getHRInterviewQADataByIdQuery =
    endpoints.getHRInterviewQADataById.initiate;
export const useHRInterviewQAsByUserId =
    HRInterviewQAFirebaseApi.useGetHRInterviewQAsByUserIdQuery;
