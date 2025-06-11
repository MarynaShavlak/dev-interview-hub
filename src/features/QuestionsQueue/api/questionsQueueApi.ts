import { firestoreApi } from '@/shared/api/firestoreApi';

import {
    deleteDocFromFirestore,
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
import { updateQuestionInFirestore } from '../lib/utilities/updateQuestionInFirestore/updateQuestionInFirestore';
import { EntityType } from '@/shared/types/entityType';

export const questionsQueueFirebaseApi = firestoreApi
    .enhanceEndpoints({ addTagTypes: ['QuestionsQueue'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getQuestionsByUser: build.query<
                Question[],
                { userId: string; type: EntityType }
            >({
                providesTags: [{ type: 'QuestionsQueue', id: 'questionId' }],
                keepUnusedDataFor: 3600,
                async queryFn({ userId, type }) {
                    if (!userId) {
                        return {
                            error: new Error(
                                ERROR_QUESTION_MESSAGES.USER_NOT_FOUND,
                            ),
                        };
                    }

                    return executeQuery(
                        () => fetchQuestionsForUser(userId, type),
                        ERROR_QUESTION_MESSAGES.QUESTIONS_BY_USER_ID_FETCH_FAIL(
                            userId,
                        ),
                    );
                },
                async onCacheEntryAdded(
                    args,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    const { userId, type } = args;
                    handleFirestoreSubscription({
                        subscriptionFn: (updateFn) =>
                            subscribeToQuestions(updateFn, userId, type),
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
            deleteQuestion: build.mutation<string, string>({
                invalidatesTags: ['QuestionsQueue'],
                async queryFn(questionId) {
                    return executeQuery(
                        () => deleteDocFromFirestore('questions', questionId),
                        ERROR_QUESTION_MESSAGES.DELETE_ERROR,
                    );
                },
            }),
            updateQuestion: build.mutation<
                Question,
                { questionId: string; updates: Partial<Question> }
            >({
                async queryFn({ questionId, updates }) {
                    return executeQuery(
                        async () =>
                            updateQuestionInFirestore(questionId, updates),
                        ERROR_QUESTION_MESSAGES.UPDATE_QUESTION_ERROR(
                            questionId,
                        ),
                    );
                },
            }),
        }),
    });

export const addQuestionMutation =
    questionsQueueFirebaseApi.endpoints.addQuestion.initiate;

export const useQuestionsByUser =
    questionsQueueFirebaseApi.useGetQuestionsByUserQuery;

export const deleteQuestionMutation =
    questionsQueueFirebaseApi.endpoints.deleteQuestion.initiate;

export const updateQuestionMutation =
    questionsQueueFirebaseApi.endpoints.updateQuestion.initiate;
