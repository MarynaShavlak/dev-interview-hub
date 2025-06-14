import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { handleThunkErrorMessage } from '@/shared/lib/firestore';

import { ERROR_VOCABULARY_MESSAGES } from '../../consts/errorVocabularyMessages';
import { Vocabulary } from '@/entities/Vocabulary';
import { addVocabularyMutation } from '../../../api/vocabularyManagerApi';

export const addVocabularyThunk = createAsyncThunk<
    Vocabulary,
    { text: string; meaning: string; translation: string },
    ThunkConfig<string>
>(
    'vocabularyManager/addVocabulary',
    async ({ text, meaning, translation }, thunkApi) => {
        const { dispatch, rejectWithValue, getState } = thunkApi;

        try {
            const userData = getUserAuthData(getState());

            if (!userData) {
                return rejectWithValue(
                    ERROR_VOCABULARY_MESSAGES.USER_NOT_FOUND,
                );
            }

            if (!text || text.trim() === '') {
                return rejectWithValue(
                    ERROR_VOCABULARY_MESSAGES.VOCABULARY_TEXT_REQUIRED,
                );
            }

            if (!meaning || meaning.trim() === '') {
                return rejectWithValue(
                    ERROR_VOCABULARY_MESSAGES.VOCABULARY_MEANING_REQUIRED,
                );
            }

            if (!translation || translation.trim() === '') {
                return rejectWithValue(
                    ERROR_VOCABULARY_MESSAGES.VOCABULARY_TRANSLATION_REQUIRED,
                );
            }

            const newVocabulary = {
                id: v4(),
                userId: userData.id,
                text: text.trim(),
                meaning: meaning.trim(),
                translation: translation.trim(),
            };

            const addedVocabulary = await dispatch(
                addVocabularyMutation(newVocabulary),
            ).unwrap();

            return addedVocabulary;
        } catch (error) {
            return rejectWithValue(
                handleThunkErrorMessage(
                    error,
                    ERROR_VOCABULARY_MESSAGES.ADD_VOCABULARY_FAIL,
                ),
            );
        }
    },
);
