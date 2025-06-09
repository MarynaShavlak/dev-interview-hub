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
