import { firestoreApi } from '@/shared/api/firestoreApi';

import {
    executeQuery,
    handleFirestoreSubscription,
} from '@/shared/lib/firestore';

import { ERROR_HR_INTERVIEW_MESSAGES } from '../model/consts/errorHRInterviewMessages';
import { HRInterviewQA } from '../model/types/hrInterviewQA';
import {
    NewHRInterviewQADraft,
    saveHRInterviewQAToFirestore,
} from '../lib/utilities/saveHRInterviewQAToFirestore/saveHRInterviewQAToFirestore';
import { updateHRInterviewQAInFirestore } from '../lib/utilities/updateHRInterviewQAInFirestore/updateHRInterviewQAInFirestore';
import { fetchHRInterviewQA } from '../lib/utilities/fetchHRInterviewQA/fetchHRInterviewQA';
import { subscribeToHRInterviewQA } from '../lib/utilities/subscribeToHRInterviewQA/subscribeToHRInterviewQA';
import { subscribeToUserArticles } from '@/entities/Article';
import { fetchHRInterviewsForUser } from '../lib/utilities/fetchHRInterviewsForUser/fetchHRInterviewsForUser';

interface UpdateHRInterviewQAArgs {
    id: string;
    updates: Partial<HRInterviewQA>;
}

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
                        () => fetchHRInterviewsForUser(userId),
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
                        subscriptionFn: subscribeToUserArticles,
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
                        () => saveHRInterviewQAToFirestore(newHRInterviewQA),
                        ERROR_HR_INTERVIEW_MESSAGES.ADD_HR_INTERVIEW_FAIL,
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
                        async () => updateHRInterviewQAInFirestore(id, updates),
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
export const updateHRInterviewQAMutation =
    endpoints.updateHRInterviewQA.initiate;
export const getHRInterviewQADataByIdQuery =
    endpoints.getHRInterviewQADataById.initiate;
export const useHRInterviewQAsByUserId =
    HRInterviewQAFirebaseApi.useGetHRInterviewQAsByUserId;
