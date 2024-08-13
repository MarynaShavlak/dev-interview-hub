import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { ScrollToolbarSchema } from '../types/ScrollSchema';

const initialState: ScrollToolbarSchema = {
    scrollStopArticleIndex: 0,
};

export const scrollToolbarSlice = buildSlice({
    name: 'scrollToolbar',
    initialState,
    reducers: {
        setScrollStopArticleIndex(state, action: PayloadAction<number>) {
            state.scrollStopArticleIndex = action.payload;
        },
        resetScrollStopArticleIndex(state) {
            state.scrollStopArticleIndex = 0;
        },
    },
});

export const {
    actions: scrollToolbarActions,
    reducer: scrollToolbarReducer,
    useActions: useScrollToolbarActions,
} = scrollToolbarSlice;
