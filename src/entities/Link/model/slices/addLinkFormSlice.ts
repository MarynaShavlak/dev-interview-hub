import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { AddLinkFormSchema } from '../types/addLinkForm';

const initialState: AddLinkFormSchema = {
    text: '',
};

export const addLinkFormSlice = buildSlice({
    name: 'addLinkForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
});

export const {
    actions: addLinkFormActions,
    reducer: addLinkFormReducer,
    useActions: useAddLinkFormActions,
} = addLinkFormSlice;
