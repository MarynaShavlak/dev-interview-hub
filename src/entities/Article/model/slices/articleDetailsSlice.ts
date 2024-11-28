import { PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleByIdThunk } from '../services/fetchArticleByIdThunk/fetchArticleByIdThunk';
import { Article } from '../types/article';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { buildSlice } from '@/shared/lib/store';

const initialState: ArticleDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const articleDetailsSlice = buildSlice({
    name: 'articleDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleByIdThunk.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchArticleByIdThunk.fulfilled,
                (state, action: PayloadAction<Article>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchArticleByIdThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: articleDetailsActions,
    reducer: articleDetailsReducer,
    useActions: useArticleDetailsActions,
} = articleDetailsSlice;
