import { firestoreApi } from '@/shared/api/firestoreApi';

import { executeQuery } from '@/shared/lib/firestore';
import { ERROR_QUESTION_MESSAGES } from '../model/consts/errorQuestionMessages';
import {
    NewQuestionDraft,
    saveQuestionToFirestore,
} from '../lib/utilities/saveQuestionToFirestore/saveQuestionToFirestore';
import { Question } from '@/entities/Question';

export const questionsQueueFirebaseApi = firestoreApi
    .enhanceEndpoints({ addTagTypes: ['QuestionsQueue'] })
    .injectEndpoints({
        endpoints: (build) => ({
            addQuestion: build.mutation<Question, NewQuestionDraft>({
                invalidatesTags: [{ type: 'QuestionsQueue', id: 'questionId' }],
                async queryFn(newQuestion) {
                    return executeQuery(
                        () => saveQuestionToFirestore(newQuestion),
                        ERROR_QUESTION_MESSAGES.ADD_QUESTION_FAIL,
                    );
                },
            }),
        }),
    });

export const addQuestionMutation =
    questionsQueueFirebaseApi.endpoints.addQuestion.initiate;
