import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { ERROR_VOCABULARY_MESSAGES } from '../../consts/errorVocabularyMessages';
import { Vocabulary } from '@/entities/Vocabulary';
import { updateVocabularyMutation } from '../../../api/vocabularyManagerApi';

export const updateVocabularyThunk = createAsyncThunk<
    Vocabulary,
    Vocabulary,
    ThunkConfig<string>
>('vocabularyManager/updateVocabulary', async (vocab: Vocabulary, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
        const response = await dispatch(
            updateVocabularyMutation({
                vocabId: vocab.id,
                updates: vocab,
            }),
        ).unwrap();

        return response;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_VOCABULARY_MESSAGES.UPDATE_VOCABULARY_ERROR(vocab.id),
            ),
        );
    }
});
