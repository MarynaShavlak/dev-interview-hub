import { firestoreApi } from '@/shared/api/firestoreApi';

import {
    executeQuery,
    handleFirestoreSubscription,
} from '@/shared/lib/firestore';
import { ERROR_QUESTION_MESSAGES } from '../model/consts/errorQuestionMessages';
import {
    NewQuestionDraft,
    saveQuestionToFirestore,
} from '../lib/utilities/saveQuestionToFirestore/saveQuestionToFirestore';
import { Question } from '@/entities/Question';
import { fetchQuestionsForUser } from '../lib/utilities/fetchQuestionsForUser/fetchQuestionsForUser';
import { subscribeToQuestions } from '../lib/utilities/subscribeToQuestions/subscribeToQuestions';

export const questionsQueueFirebaseApi = firestoreApi
    .enhanceEndpoints({ addTagTypes: ['QuestionsQueue'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getQuestionsByUser: build.query<Question[], string>({
                providesTags: [{ type: 'QuestionsQueue', id: 'questionId' }],
                keepUnusedDataFor: 3600,
                async queryFn(userId: string) {
                    if (!userId) {
                        return {
                            error: new Error(
                                ERROR_QUESTION_MESSAGES.USER_NOT_FOUND,
                            ),
                        };
                    }

                    return executeQuery(
                        () => fetchQuestionsForUser(userId),
                        ERROR_QUESTION_MESSAGES.QUESTIONS_BY_USER_ID_FETCH_FAIL(
                            userId,
                        ),
                    );
                },
                async onCacheEntryAdded(
                    userId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToQuestions,
                        updateFn: updateCachedData,
                        dependency: userId,
                        cacheDataLoaded,
                        cacheEntryRemoved,
                    });
                },
            }),
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

export const useQuestionsByUser =
    questionsQueueFirebaseApi.useGetQuestionsByUserQuery;
