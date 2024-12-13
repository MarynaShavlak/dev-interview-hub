import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '../..';

export const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const initialState = articlesAdapter.getInitialState();
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articles || initialState,
);

const articleSlice = buildSlice({
    name: 'articleSlice',
    initialState: articlesAdapter.getInitialState<EntityState<Article>>({
        ids: [],
        entities: {},
    }),
    reducers: {},
});

export const {
    reducer: articleReducer,
    actions: articleActions,
    useActions: useArticleActions,
} = articleSlice;
