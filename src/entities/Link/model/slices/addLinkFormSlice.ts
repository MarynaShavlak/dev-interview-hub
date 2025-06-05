import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { AddLinkFormSchema } from '../types/addLinkForm';

const initialState: AddLinkFormSchema = {
    text: '',
    label: '',
};

export const addLinkFormSlice = buildSlice({
    name: 'addLinkForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
        setLabel: (state, action: PayloadAction<string>) => {
            state.label = action.payload;
        },
    },
});

export const {
    actions: addLinkFormActions,
    reducer: addLinkFormReducer,
    useActions: useAddLinkFormActions,
} = addLinkFormSlice;
