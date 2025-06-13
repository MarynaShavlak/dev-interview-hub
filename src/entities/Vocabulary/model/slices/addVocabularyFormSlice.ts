import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { AddVocabularyFormSchema } from '../types/addVocabularyForm';

const initialState: AddVocabularyFormSchema = {
    text: '',
    meaning: '',
    translation: '',
};

export const addVocabularyFormSlice = buildSlice({
    name: 'addVocabularyForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
        setMeaning: (state, action: PayloadAction<string>) => {
            state.meaning = action.payload;
        },
        setTranslation: (state, action: PayloadAction<string>) => {
            state.translation = action.payload;
        },
    },
});

export const {
    actions: addVocabularyFormActions,
    reducer: addVocabularyFormReducer,
    useActions: useAddVocabularyFormActions,
} = addVocabularyFormSlice;
