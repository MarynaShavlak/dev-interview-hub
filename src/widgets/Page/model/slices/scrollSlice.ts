import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { UIScrollSchema } from '../types/ScrollSchema';

const initialState: UIScrollSchema = {
    scroll: {},
};

export const scrollSlice = buildSlice({
    name: 'scroll',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            { payload }: PayloadAction<{ path: string; position: number }>,
        ) => {
            state.scroll[payload.path] = payload.position;
        },
    },
});

export const {
    actions: scrollActions,
    reducer: scrollReducer,
    useActions: useScrollActions,
} = scrollSlice;
