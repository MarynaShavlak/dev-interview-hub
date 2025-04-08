import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { AddQuestionFormSchema } from '../types/addQuestionForm';

const initialState: AddQuestionFormSchema = {
    text: '',
};

export const addQuestionFormSlice = buildSlice({
    name: 'addQuestionForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
});

export const {
    actions: addQuestionFormActions,
    reducer: addQuestionFormReducer,
    useActions: useAddQuestionFormActions,
} = addQuestionFormSlice;
