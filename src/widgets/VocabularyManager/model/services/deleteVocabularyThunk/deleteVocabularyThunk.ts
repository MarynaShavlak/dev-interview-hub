import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { ERROR_VOCABULARY_MESSAGES } from '../../consts/errorVocabularyMessages';
import { deleteVocabularyMutation } from '../../../api/vocabularyManagerApi';

export const deleteVocabularyThunk = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>('vocabularyManager/deleteVocabulary', async (vocabId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!vocabId) {
        return rejectWithValue(
            ERROR_VOCABULARY_MESSAGES.VOCABULARY_ID_REQUIRED,
        );
    }

    try {
        const deletedVocabId = await dispatch(
            deleteVocabularyMutation(vocabId),
        ).unwrap();

        return deletedVocabId;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_VOCABULARY_MESSAGES.DELETE_ERROR,
            ),
        );
    }
});
