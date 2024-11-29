import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleCommentsSchema } from '../types/ArticleCommentsSchema';
import { ArticleComment } from '../..';

export const commentsAdapter = createEntityAdapter<ArticleComment>({
    selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleComments || commentsAdapter.getInitialState(),
);
export const initialState =
    commentsAdapter.getInitialState<ArticleCommentsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    });

const articleCommentsSlice = createSlice({
    name: 'articleCommentsSlice',
    initialState,
    reducers: {},
});

export const { reducer: articleCommentsReducer } = articleCommentsSlice;

// builder
//     .addCase(fetchCommentsByArticleIdThunk.pending, (state) => {
//         state.error = undefined;
//         state.isLoading = true;
//     })
//     .addCase(
//         fetchCommentsByArticleIdThunk.fulfilled,
//         (state, action: PayloadAction<ArticleComment[]>) => {
//             state.isLoading = false;
//             commentsAdapter.setAll(state, action.payload);
//         },
//     )
//     .addCase(
//         fetchCommentsByArticleIdThunk.rejected,
//         (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//         },
//     );
