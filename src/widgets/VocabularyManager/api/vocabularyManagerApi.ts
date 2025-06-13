import { firestoreApi } from '@/shared/api/firestoreApi';

import {
    deleteDocFromFirestore,
    executeQuery,
    fetchCollectionForUser,
    handleFirestoreSubscription,
    saveDocToFirestore,
} from '@/shared/lib/firestore';

import { ERROR_VOCABULARY_MESSAGES } from '../model/consts/errorVocabularyMessages';

import { Vocabulary } from '@/entities/Vocabulary';
import { subscribeToVocabulary } from '../lib/utilities/subscribeToVocabulary/subscribeToVocabulary';

import { updateDocById } from '@/shared/lib/firestore/updateDocById/updateDocById';

export type NewVocabularyDraft = Omit<Vocabulary, 'createdAt'>;

export const vocabularyManagerFirebaseApi = firestoreApi
    .enhanceEndpoints({ addTagTypes: ['VocabularyManager'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getVocabularyByUser: build.query<Vocabulary[], string>({
                providesTags: [{ type: 'VocabularyManager', id: 'vocabId' }],
                keepUnusedDataFor: 3600,
                async queryFn(userId: string) {
                    if (!userId) {
                        return {
                            error: new Error(
                                ERROR_VOCABULARY_MESSAGES.USER_NOT_FOUND,
                            ),
                        };
                    }

                    return executeQuery(
                        () =>
                            fetchCollectionForUser<Vocabulary>(
                                'vocabularies',
                                userId,
                            ),
                        ERROR_VOCABULARY_MESSAGES.VOCABULARY_BY_USER_ID_FETCH_FAIL(
                            userId,
                        ),
                    );
                },
                async onCacheEntryAdded(
                    userId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToVocabulary,
                        updateFn: updateCachedData,
                        dependency: userId,
                        cacheDataLoaded,
                        cacheEntryRemoved,
                    });
                },
            }),
            addVocabulary: build.mutation<Vocabulary, NewVocabularyDraft>({
                invalidatesTags: [{ type: 'VocabularyManager', id: 'vocabId' }],
                async queryFn(newVocabulary) {
                    return executeQuery(
                        () =>
                            saveDocToFirestore<Vocabulary>(
                                'vocabularies',
                                newVocabulary,
                                ERROR_VOCABULARY_MESSAGES.VOCABULARY_RETRIEVAL_FAIL,
                            ),
                        ERROR_VOCABULARY_MESSAGES.ADD_VOCABULARY_FAIL,
                    );
                },
            }),
            deleteVocabulary: build.mutation<string, string>({
                invalidatesTags: ['VocabularyManager'],
                async queryFn(vocabId) {
                    return executeQuery(
                        () => deleteDocFromFirestore('vocabularies', vocabId),
                        ERROR_VOCABULARY_MESSAGES.DELETE_ERROR,
                    );
                },
            }),
            updateVocabulary: build.mutation<
                Vocabulary,
                { vocabId: string; updates: Partial<Vocabulary> }
            >({
                async queryFn({ vocabId, updates }) {
                    return executeQuery(
                        async () =>
                            updateDocById('vocabularies', vocabId, updates),
                        ERROR_VOCABULARY_MESSAGES.UPDATE_VOCABULARY_ERROR(
                            vocabId,
                        ),
                    );
                },
            }),
        }),
    });

export const addVocabularyMutation =
    vocabularyManagerFirebaseApi.endpoints.addVocabulary.initiate;

export const useVocabularyByUser =
    vocabularyManagerFirebaseApi.useGetVocabularyByUserQuery;

export const deleteVocabularyMutation =
    vocabularyManagerFirebaseApi.endpoints.deleteVocabulary.initiate;

// export const updateVocabularyMutation =
//     vocabularyManagerFirebaseApi.endpoints.updateVocabulary.initiate;
