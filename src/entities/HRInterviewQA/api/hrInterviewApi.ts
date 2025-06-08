import { firestoreApi } from '@/shared/api/firestoreApi';

import { executeQuery } from '@/shared/lib/firestore';

import { ERROR_HR_INTERVIEW_MESSAGES } from '../model/consts/errorHRInterviewMessages';
import { HRInterviewQA } from '../model/types/hrInterviewQA';
import {
    NewHRInterviewQADraft,
    saveHRInterviewQAToFirestore,
} from '../lib/utilities/saveHRInterviewQAToFirestore/saveHRInterviewQAToFirestore';

export const HRInterviewQAFirebaseApi = firestoreApi
    .enhanceEndpoints({
        addTagTypes: ['HrInterviewQAs'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            addHRInterviewQA: build.mutation<
                HRInterviewQA,
                NewHRInterviewQADraft
            >({
                invalidatesTags: ['HrInterviewQAs'],
                async queryFn(newHRInterviewQA) {
                    return executeQuery(
                        () => saveHRInterviewQAToFirestore(newHRInterviewQA),
                        ERROR_HR_INTERVIEW_MESSAGES.ADD_HR_INTERVIEW_FAIL,
                    );
                },
            }),
        }),
    });

const { endpoints } = HRInterviewQAFirebaseApi;

export const addHRInterviewQAMutation = endpoints.addHRInterviewQA.initiate;
